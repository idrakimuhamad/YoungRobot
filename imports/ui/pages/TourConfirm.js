import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {
  Base,
  Section,
  Button,
  PageHeader,
  Heading } from 'rebass';
import { Flex, Box } from 'reflexbox';
import moment from 'moment';
import { Loader } from '../components/Loader';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';

const bookingDetails = {
  bookingType: 'Airport transfer',
  name: 'John Wall',
  passengerName: 'John Wall',
  contact: '0123456789',
  email: 'john@wall.com',
  pickupDate: moment().startOf('hour').format('DD/MM/YYYY HH:mm'),
  noOfPassenger: 3,
  pickupAddress: 'Kuala Lumpur International Airport, 64000 Sepang, Selangor, Malaysia',
  dropoffAddress: '1 Avenue, Bangsar South, 59200 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia',
  flightNumber: 'MH69',
  flightETA: 2200,
  options: {
    wifi: true,
    babySeat: false,
    gps: false
  },
  otherDetails: 'none'
};

export class TourConfirm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: props.userType,
      confirmBookingLoading: false
    };
  }

  componentWillUpdate(nextProps, nextState) {
  }

  render() {
    return (
      <div className="limo-wrapper">
        <Flex
          py={4}
          align="center"
          justify ="center"
          column>
            <Box
              col={12}>
              <div className="limo-inner">
                <PageHeader
                  description="Your booking completed."
                  heading="Tour has been Booked"
                  px={2}
                  />
                <Flex wrap>
                  <Box
                    col={12}
                    sm={6}
                    p={2}>
                    <div className="limo-booking-confirmation">
                      <Section
                        py={1}>
                        <div className="confirmation-table">
                          <Flex
                            wrap>
                              <Box
                                col={12}
                                sm={12}>
                                <div className="confirmation-item">
                                  <span className="confirmation-label">Name</span>
                                  <span className="confirmation-value">{bookingDetails.name}</span>
                                </div>
                              </Box>
                              <Box
                                col={12}
                                sm={6}>
                                <div className="confirmation-item">
                                  <span className="confirmation-label">Contact No</span>
                                  <span className="confirmation-value">{bookingDetails.contact}</span>
                                </div>
                              </Box>
                              <Box
                                col={12}
                                sm={6}>
                                <div className="confirmation-item">
                                  <span className="confirmation-label">Email</span>
                                  <span className="confirmation-value">{bookingDetails.email}</span>
                                </div>
                              </Box>
                              <Box
                                col={12}
                                sm={12}>
                                <div className="confirmation-item">
                                  <span className="confirmation-label">Tour Date</span>
                                  <span className="confirmation-value">{bookingDetails.pickupDate}</span>
                                </div>
                              </Box>
                              <Box
                                col={12}
                                sm={12}>
                                <div className="confirmation-item">
                                  <span className="confirmation-label">Pickup Address</span>
                                  <span className="confirmation-value">{bookingDetails.pickupAddress}</span>
                                </div>
                              </Box>
                              <Box
                                col={12}
                                sm={6}>
                                <div className="confirmation-item">
                                  <span className="confirmation-label">Adult</span>
                                  <span className="confirmation-value">2</span>
                                </div>
                              </Box>

                              <Box
                                col={12}
                                sm={6}>
                                <div className="confirmation-item">
                                  <span className="confirmation-label">Children</span>
                                  <span className="confirmation-value">4</span>
                                </div>
                              </Box>
                          </Flex>
                        </div>
                      </Section>
                    </div>
                  </Box>
                </Flex>
              </div>
            </Box>
          </Flex>
      </div>
    )
  }
}
