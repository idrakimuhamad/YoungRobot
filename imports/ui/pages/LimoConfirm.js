import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';
import { getBooking, vehicleDetails, abortBooking } from '../../api/methods';
import { LimoConfirmSummary } from '../components/LimoConfirmSummary';

export class LimoConfirm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: props.userType,
      token: props.token,
      orderNo: props.location.query.order,
      bookingDetails: {},
      customerDetails: {},
      selectedLimo: {},
      error: false,
      errorMessage: '',
      loading: true,
      loadingMessage: 'loading',
      confirmBookingLoading: false
    };

    this.getBooking = this.getBooking.bind(this);
    this.getBooking = this.getBooking.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.getBooking(this.state.orderNo);
  }

  componentWillUpdate(nextProps, nextState) {
  }

  getBooking(orderNo) {
    this.setState({
      error: false,
      errorMessage: ''
    });

    getBooking.call({
      orderId: orderNo,
      token: this.state.token
    }, (err, res) => {
      if (err) {
        this.setState({
          error: true,
          errorMessage: err.reason
        });

        if (err.error == 'NO_AUTHORIZATION') {
          // redirect to logout
          browserHistory.push('/logout');
        }
      } else {
        // success
        // check the status
        if (res.data.paymentStatus === 'unpaid' &&
            (res.data.status !== 'aborted' &&
            res.data.status !== 'cancelled')) {
          // only if its unpaid, other booking will be directed to booking history
          this.setState({
            bookingDetails: res.data,
            customerDetails: res.data.cartItems[0].customDetails
          });

          // get the vehicle details
          this.getVehicle(res.data.cartItems[0].masterProductId);
        } else {
          browserHistory.push('/account/bookings?order=' + res.data.orderId);
        }
      }
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

  handleCancel() {
    // confirm
    let cancel = confirm('Are you sure you want to cancel the booking? You can not undo this process.');

    if (cancel) {
      this.setState({
        loading: true,
        loadingMessage: 'cancelling booking'
      });

      // cancel the booking
      abortBooking.call({
        id: this.state.bookingDetails.id,
        token: this.state.token
      }, (err, res) => {
        if (err) {
          this.setState({
            error: true,
            errorMessage: err.reason,
            loading: false,
            loadingMessage: 'loading'
          });
        } else {
          this.setState({
            loading: false,
            loadingMessage: 'loading'
          });

          // notify
          alert('Booking cancelled. You will be redirected to the limo list page.');

          // redirect to limo list
          browserHistory.push('/limo');
        }
      });
    }
  }

  handleConfirm() {
    // this is where we do the payment redirection
    this.setState({
      confirmBookingLoading: true
    });

    browserHistory.push('/limo/payment?order=' + this.state.orderNo);
  }

  render() {
    const {
      loading,
      loadingMessage,
      bookingType,
      bookingDetails,
      customerDetails,
      confirmBookingLoading,
      selectedLimo,
      error,
      errorMessage } = this.state;

    return (
      <LimoConfirmSummary
        loading={loading}
        loadingMessage={loadingMessage}
        error={error}
        errorMessage={errorMessage}
        booking={bookingDetails}
        customerDetails={customerDetails}
        confirmBookingLoading={confirmBookingLoading}
        selectedLimo={selectedLimo}
        handleConfirm={this.handleConfirm}
        handleCancel={this.handleCancel}/>
    )
  }
}
