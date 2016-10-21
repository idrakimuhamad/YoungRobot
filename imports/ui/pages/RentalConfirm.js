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

export class RentalConfirm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: props.userType,
      vehicleId: props.location.query.vehicle,
      selectedCar: props.vehicles[props.location.query.vehicle],
      confirmBookingLoading: false
    };
  }

  componentWillUpdate(nextProps, nextState) {
  }

  render() {
    const { selectedCar } = this.state;
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
                  description="Your booking rental completed."
                  heading="Booking Success"
                  px={2}
                  />
                <Flex wrap>
                  <Box
                    col={12}
                    sm={6}
                    p={2}>
                    <div className="limo-card limo-booking-page">
                      <div className="limo-card-image"
                        style={{ backgroundImage: 'url(' + selectedCar.image + ')'}}>
                        <div className="limo-card-title">
                          <Heading
                            level={4}
                            m={0}
                            style={IndexLayout.caps} >
                            {selectedCar.name}
                          </Heading>
                        </div>
                        <span className="specs">
                          <span className="passenger" title="Excluding Driver">
                            <i className="icon ion-person-stalker"></i>
                            <b>{selectedCar.passenger}</b>
                          </span>
                          <span className="luggage">
                            <i className="icon ion-briefcase"></i>
                            <b>{selectedCar.luggage}</b>
                          </span>
                        </span>
                      </div>
                    </div>
                    <Flex
                      column
                      align='center'
                      justify='center'>
                      <div className="limo-price">
                        <Heading
                          level={4}
                          m={0}
                          style={IndexLayout.caps}
                          children="Estimated Price"/>
                        <Heading
                          level={2}
                          m={0}
                          style={IndexLayout.caps}
                          children='RM580'/>
                      </div>
                    </Flex>
                  </Box>
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
                                  <span className="confirmation-label">Pickup Date</span>
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
                                sm={4}>
                                <div className="confirmation-item">
                                  <span className="confirmation-label">WIFI</span>
                                  <span className="confirmation-value">{bookingDetails.options.wifi ? <i className="icon ion-checkmark-round"></i> : <i className="icon ion-close-round"></i>}</span>
                                </div>
                              </Box>
                              <Box
                                col={12}
                                sm={4}>
                                <div className="confirmation-item">
                                  <span className="confirmation-label">Baby Seat</span>
                                  <span className="confirmation-value">{bookingDetails.options.babySeat ? <i className="icon ion-checkmark-round"></i> : <i className="icon ion-close-round"></i>}</span>
                                </div>
                              </Box>
                              <Box
                                col={12}
                                sm={4}>
                                <div className="confirmation-item">
                                  <span className="confirmation-label">GPS</span>
                                  <span className="confirmation-value">{bookingDetails.options.gps ? <i className="icon ion-checkmark-round"></i> : <i className="icon ion-close-round"></i>}</span>
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
