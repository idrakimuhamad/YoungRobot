import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { getBooking, getBookings, vehicleDetails, cancelBooking, abortBooking } from '../../api/methods';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';
import { BookingList } from '../components/BookingList';

export class BookingHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // userType: props.userType,
      loading: true,
      loadingSingle: false,
      token: props.token,
      orderNo: props.location.query.order,
      bookings: [],
      error: false,
      errorMessage: ''
    };

    this.getBooking = this.getBooking.bind(this);
    this.closeBooking = this.closeBooking.bind(this);
    this.getVehicle = this.getVehicle.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  componentDidMount() {
    // check the status of the booking to make sure it needed to be pay
    getBookings.call(this.state.token, (err, res) => {
      if (err) {
        this.setState({
          loading: false,
          error: true,
          errorMessage: err.reason
        });
      } else {
        // success
        const bookings = res.data;
        this.setState({
          loading: false,
          bookings: bookings
        });

        // if it also include a single view booking, load it up
        if (this.state.orderNo) {
          this.setState({
            loadingSingle: true
          });

          this.getBooking(this.state.orderNo);
        }
      }
    });
  }

  componentWillReceiveProps(props) {
    if (props.location.query.order && (!this.state.orderNo || this.state.orderNo !== props.location.query.order)) {
      this.setState({
        orderNo: props.location.query.order
      });

      this.getBooking(props.location.query.order);
    }
  }

  updateList() {
    getBookings.call(this.state.token, (err, res) => {
      if (err) {
        this.setState({
          loading: false,
          error: true,
          errorMessage: err.reason
        });
      } else {
        // success
        const bookings = res.data;
        this.setState({
          loading: false,
          bookings: bookings
        });
      }
    });
  }

  getBooking(id) {
    this.setState({
      loadingSingle: true
    });

    getBooking.call({
      orderId: id,
      token: this.state.token
    }, (err, res) => {
      const booking = res.data;

      this.setState({
        loadingSingle: false,
        booking: booking
      });

      // we need the vehicle details too
      this.getVehicle(booking.cartItems[0].masterProductId);
    });
  }

  getVehicle(id) {
    vehicleDetails.call({
      type: 'limo',
      id: id,
      token: this.state.token
    }, (err, res) => {
      if (err) {
        this.setState({
          error: true,
          loadingVehicle: false,
          loading: false
        });
      } else {
        let selectedLimo = res.data;

        this.setState({
          selectedLimo: selectedLimo,
          loadingVehicle: false,
          loading: false
        });
      }
    });
  }

  closeBooking() {
    browserHistory.push('/account/bookings');
    this.setState({
      loadingSingle: false,
      booking: null
    });
  }

  handleCancel() {
    const { booking, token } = this.state,
        api = booking && booking.paymentStatus === 'paid' ? cancelBooking : abortBooking;

    // asked for confirmation
    let cancel = confirm('Are you sure you want to cancel this booking? This cannot be undo. If this booking was already paid, we will refund the money.');

    if (cancel) {
      this.setState({
        loadingSingle: true
      });

      // cancel the booking, determine the type of cancel to be use based on payment status
      api.call({
        id: booking.id,
        token: token
      }, (err, res) => {
        if (err) {
          this.setState({
            loadingSingle: false,
            error: true,
            errorMessage: err.reason
          });
        } else {
          this.closeBooking();
          this.updateList();
        }
      });
    }
  }

  render() {
    const {
      bookings,
      booking,
      selectedLimo,
      error,
      errorMessage,
      loading,
      loadingSingle,
      orderNo } = this.state;

    return (
      <BookingList
        loading={loading}
        loadingSingle={loadingSingle}
        error={error}
        errorMessage={errorMessage}
        bookingList={bookings}
        bookingSingle={booking}
        orderNo={orderNo}
        selectedLimo={selectedLimo}
        handleCancel={this.handleCancel}
        closeBooking={this.closeBooking}/>
    );
  }
}
