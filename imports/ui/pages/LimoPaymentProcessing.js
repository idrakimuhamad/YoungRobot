import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Banner } from 'rebass';
import { Flex, Box } from 'reflexbox';
import moment from 'moment';
import { Loader } from '../components/Loader';
import { getBooking, payBooking, getVcode } from '../../api/methods';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';

export class LimoPaymentProcessing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: props.userType,
      token: props.token,
      orderNo: props.location.query.orderid,
      skey: props.location.query.skey,
      currency: props.location.query.currency,
      tranID: props.location.query.tranID,
      status: props.location.query.status,
      amount: props.location.query.amount,
      appcode: props.location.query.appcode,
      domain: props.location.query.domain,
      paydate: props.location.query.paydate,
      channel: props.location.query.channel,
      error_code: props.location.query.error_code,
      error_desc: props.location.query.error_desc,
      error: false
    };
  }

  componentDidMount() {
    // find the booking
    getBooking.call({
      orderId: this.state.orderNo,
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
        this.setState({
          loading: false,
          bookingDetails: res.data
        });

        // serer hardcoded with 130 as the value. decimal will be considered as wrong :-/
        const body = {
          merchant_name: 'Something something',
          transaction_id: this.state.tranID,
          total_payment: 130,
          // total_payment: this.state.amount,
          paid_date: this.state.paydate,
          payment_type: 1,
          payment_paydate: this.state.paydate,
          payment_trans_id: this.state.tranID,
          payment_skey: this.state.skey,
          payment_currency: this.state.currency,
          payment_amount: 130,
          // payment_amount: this.state.amount,
          payment_domain: this.state.domain,
          payment_status: this.state.status,
          payment_appcode: this.state.appcode,
          payment_error_code: this.state.error_code,
          payment_error_desc: this.state.error_desc,
          payment_channel: this.state.channel
        };

        // update the payment status
        payBooking.call({
          id: res.data.id,
          body: body,
          token: this.state.token
        }, (err, res) => {
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
            browserHistory.push('/limo/summary?order=' + this.state.orderNo);
          }
        });
      }
    });
  }

  componentWillUpdate(nextProps, nextState) {
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
                </Banner>
              </div>
            </Box>
          </Flex>
      </div>
    )
  }
}
