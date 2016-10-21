import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {
  Base,
  Section,
  Button,
  PageHeader,
  Heading,
  Space,
  ButtonOutline } from 'rebass';
import { Flex, Box } from 'reflexbox';
import moment from 'moment';
import { getBooking, vehicleDetails } from '../../api/methods';
import { LimoSummaryPanel } from '../components/LimoSummaryPanel';

export class LimoSummary extends Component {
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
      favoriteAdded: false
    };

    this.handleFav = this.handleFav.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getBooking = this.getBooking.bind(this);
  }

  componentDidMount() {
    this.getBooking(this.state.orderNo);
  }

  getBooking(orderNo) {
    getBooking.call({
      orderId: orderNo,
      token: this.state.token
    }, (err, res) => {
      if (err) {
        this.setState({
          error: true,
          errorMessage: err.reason,
          loading: false
        });

        if (err.error == 'NO_AUTHORIZATION') {
          // redirect to logout
          browserHistory.push('/logout');
        }
      } else {
        // success
        this.setState({
          loading: false,
          bookingDetails: res.data,
          customerDetails: res.data.cartItems[0].customDetails
        });

        // get the vehicle details
        this.getVehicle(res.data.cartItems[0].masterProductId);
      }
    });
  }

  getVehicle(id) {
    vehicleDetails.call({
      type: 'limo',
      token: this.state.token,
      id: id
    }, (err, res) => {
      if (err) {
        console.error(err);
        this.setState({
          error: true,
          loadingVehicle: false
        });
      } else {
        let selectedLimo = res.data;

        this.setState({
          selectedLimo: selectedLimo,
          loadingVehicle: false
        });
      }
    });
  }

  componentWillUpdate(nextProps, nextState) {
  }

  handleFav() {
    this.props.openModal({
      title: "Booking Added to Favorite",
      body: "Good job! You can then use this reference for your future booking without the need to redo the whole process again."
    });
  }

  closeModal() {
    this.setState({
      favoriteAdded: false
    });
  }

  render() {
    const {
      loading,
      selectedLimo,
      error,
      bookingType,
      bookingDetails,
      customerDetails } = this.state;

    return (
      <LimoSummaryPanel
        loading={loading}
        error={error}
        booking={bookingDetails}
        customerDetails={customerDetails}
        selectedLimo={selectedLimo}
        handleFav={this.handleFav}
        closeModal={this.closeModal}
        />
    )
  }
}
