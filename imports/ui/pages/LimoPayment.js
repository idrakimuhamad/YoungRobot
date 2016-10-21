import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {
  Base,
  Section,
  Button,
  PageHeader,
  Heading,
  Banner,
  Message,
  Space,
  Close } from 'rebass';
import { Flex, Box } from 'reflexbox';
import moment from 'moment';
import { Loader } from '../components/Loader';
import { getBooking, payBooking, getVcode } from '../../api/methods';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';

export class LimoPayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: props.userType,
      token: props.token,
      orderNo: props.location.query.order,
      error: false,
      errorMessage: ''
    };

    this.processPayment = this.processPayment.bind(this);
  }

  componentDidMount() {
    const currentHost = location.host;

    // check the status of the booking to make sure it needed to be pay
    getBooking.call({
      orderId: this.state.orderNo,
      token: this.state.token
    }, (err, res) => {
      if (err) {
        this.setState({
          error: true,
          errorMessage: err.reason
        });
      } else {
        // success
        const booking = res.data,
              details = booking.cartItems[0].customDetails;
        this.setState({
          bookingDetails: booking,
          customerDetails: details
        });

        // check the status
        if (res.data.paymentStatus === 'unpaid') {
          // generate the payment link and redirect
          getVcode.call({
            orderId: booking.orderId,
            amount: '130'
          }, function(err, res) {
            if (err) {
              console.error('ERROR: ' + err);
            } else {
              // TODO: redirect to payment link
              const query = 'amount=' + '130' + '&orderid=' +  booking.orderId + '&bill_name=' + details.passengerName
                            + '&bill_email=' + details.passengerEmail + '&bill_mobile=' + details.passengerHP
                            + '&bill_desc=' + 'Booking payment #' + booking.orderId + ' for Limo service' + '&country=' + 'MY' + '&vcode=' + res.vcode
                            + '&returnurl=http://' + currentHost + '/api/limo/processPayment';

              // location.href = 'https://www.onlinepayment.com.my/MOLPay/pay/' + res.merchantId + '?' + query;
              // sandbox
              location.href = 'https://www.onlinepayment.com.my/NBepay/pay/' + res.merchantId + '/?' + query;
            }
          });
        } else {
          // redirect to the confirmation page if already paid
          browserHistory.push('/limo/summary?order=' + this.state.bookingId + '&type=' + this.state.bookingType);
        }
      }
    });
  }

  componentWillUpdate(nextProps, nextState) {
  }

  getBooking(type, id) {

  }

  processPayment() {
    // update the booking to paid
    this.setState({
      loadingPayment: true
    });

    payBooking.call(this.state.bookingId, (err, res) => {
      if (err) {
        console.error(err);
        this.setState({
          error: true,
          loadingPayment: false
        });
      } else {
        // success
        this.setState({
          loadingPayment: false
        });

        // redirect
        browserHistory.push('/limo/summary?order=' + this.state.bookingId + '&type=' + this.state.bookingType);
      }
    });
  }

  render() {
    const { bookingId, bookingType } = this.props;

    return (
      <div className="limo-wrapper">
        <Flex
          align="center"
          justify ="center"
          column>
          <Box
            col={12}>
            <div className="limo-inner">
              <Banner
                align="center"
                backgroundColor="white"
                mb={0}>
                <Loader />
                <Heading
                  level={3}>
                  Redirecting you to our payment gateway page... Please hold on and don't close the browser.
                </Heading>
              </Banner>
            </div>
          </Box>
        </Flex>
      </div>
    )
  }
}
