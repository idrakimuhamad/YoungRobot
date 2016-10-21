import React from 'react';
import { browserHistory, Link } from 'react-router';
import {
  Banner,
  Base,
  Section,
  Button,
  PageHeader,
  Heading,
  Space,
  ButtonOutline,
  Text } from 'rebass';
import { Flex, Box } from 'reflexbox';
import moment from 'moment';
import { Loader } from '../components/Loader';
import { Modal } from '../components/Modal';
import { publicEndpoint } from '../../api/endpoints';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';

export const LimoSummaryPanel = (props) => {
  const { booking, customerDetails, selectedLimo } = props;
  const totalPrice = booking.grossTotalCost;
  const imgUrl = selectedLimo
    && selectedLimo.imageBase64
    && selectedLimo.imageBase64.length ?
    publicEndpoint + '/syntronic-api-v1/catalogs/Limo/products/' + props.selectedLimo.id + '/image' :
    'https://placehold.it/450x450';
  return (
    <div className="limo-wrapper">
      <Flex
        py={4}
        align="center"
        justify ="center"
        column>
        <Box
          col={12}>
          {props.error ? <Flex
            justify="center"
            align="center"
            column
            >
            <Text>Opps.. There seems to be a problem in retrieving the data from the server. Check your connection or email our support.</Text>
          </Flex>
            : null}
          {props.loading ?
            <Banner
              align="center"
              backgroundColor="white"
              mb={0}>
              <Loader />
            </Banner> :
            <div className="limo-inner">
              <PageHeader
                description="Your booking has been confirmed. We will sent you an email for any update shortly. Please keep the booking no as reference."
                heading="Booking Completed"
                px={2}
                />
              <Flex wrap>
                <Box
                  col={12}
                  sm={6}
                  p={2}>
                  <div className="limo-card limo-booking-page">
                    <div className="limo-card-image"
                      style={{ backgroundImage: 'url(' + imgUrl + ')'}}>
                      <div className="limo-card-title">
                        <Heading
                          level={4}
                          m={0}
                          style={IndexLayout.caps} >
                          {selectedLimo.name}
                        </Heading>
                      </div>
                      <span className="specs">
                        <span className="passenger" title="Excluding Driver">
                          <i className="icon ion-person-stalker"></i>
                          <b>{selectedLimo.passenger}</b>
                        </span>
                        <span className="luggage">
                          <i className="icon ion-briefcase"></i>
                          <b>{selectedLimo.luggage}</b>
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
                        children="Total Price"/>
                      <Heading
                        level={2}
                        m={0}
                        style={IndexLayout.caps}
                        children={'RM' + totalPrice}/>
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
                            sm={6}>
                            <div className="confirmation-item">
                              <span className="confirmation-label">Booking #</span>
                              <span className="confirmation-value">{booking.orderId}</span>
                            </div>
                          </Box>
                          <Box
                            col={12}
                            sm={6}>
                            <div className="confirmation-item">
                              <span className="confirmation-label">Payment Status</span>
                              <span className="confirmation-value capitalize">{booking.paymentStatus}</span>
                            </div>
                          </Box>
                          <Box
                            col={12}
                            sm={6}>
                            <div className="confirmation-item">
                              <span className="confirmation-label">Type</span>
                              <span className="confirmation-value">{booking.cartItems[0].topic == 'Taxi' ? 'Point to point' :
                                                                    (booking.cartItems[0].topic == 'Limo' ? 'Airport Transfer' :
                                                                    (booking.cartItems[0].topic == 'Rental' ? 'Rental' : '-'))}</span>
                            </div>
                          </Box>
                          {/* <Box
                            col={12}
                            sm={12}>
                            <div className="confirmation-item">
                              <span className="confirmation-label">Name</span>
                              <span className="confirmation-value">{bookingDetails.name}</span>
                            </div>
                          </Box> */}
                          <Box
                            col={12}
                            sm={6}>
                            <div className="confirmation-item">
                              <span className="confirmation-label">Passenger's Name</span>
                              <span className="confirmation-value">{customerDetails.passengerName}</span>
                            </div>
                          </Box>
                          <Box
                            col={12}
                            sm={6}>
                            <div className="confirmation-item">
                              <span className="confirmation-label">Contact No</span>
                              <span className="confirmation-value">{customerDetails.passengerHP}</span>
                            </div>
                          </Box>
                          <Box
                            col={12}
                            sm={6}>
                            <div className="confirmation-item">
                              <span className="confirmation-label">Email</span>
                              <span className="confirmation-value">{customerDetails.passengerEmail}</span>
                            </div>
                          </Box>
                          <Box
                            col={12}
                            sm={12}>
                            <div className="confirmation-item">
                              <span className="confirmation-label">Pickup Date</span>
                              <span className="confirmation-value">{moment(customerDetails.pickupTime).format('DD/MM/YYYY HH:mm')}</span>
                            </div>
                          </Box>
                          <Box
                            col={12}
                            sm={12}>
                            <div className="confirmation-item">
                              <span className="confirmation-label">Pickup Address</span>
                              <span className="confirmation-value">{customerDetails.pickupAddress}, {customerDetails.pickupZipcode}</span>
                            </div>
                          </Box>
                          <Box
                            col={12}
                            sm={12}>
                            <div className="confirmation-item">
                              <span className="confirmation-label">Drop-off Address</span>
                              <span className="confirmation-value">{customerDetails.dropOffAddress ? customerDetails.dropOffAddress : '-'}{customerDetails.dropOffZipcode ? ', ' + customerDetails.dropOffZipcode : '-' }</span>
                            </div>
                          </Box>
                          <Box
                            col={12}
                            sm={4}>
                            <div className="confirmation-item">
                              <span className="confirmation-label">Passengers</span>
                              <span className="confirmation-value">{customerDetails.totalPassengers}</span>
                            </div>
                          </Box>
                          <Box
                            col={12}
                            sm={4}>
                            <div className="confirmation-item">
                              <span className="confirmation-label">Flight Number</span>
                              <span className="confirmation-value">-</span>
                            </div>
                          </Box>
                          <Box
                            col={12}
                            sm={4}>
                            <div className="confirmation-item">
                              <span className="confirmation-label">Flight ETA</span>
                              <span className="confirmation-value">-</span>
                            </div>
                          </Box>
                          <Box
                            col={12}
                            sm={4}>
                            <div className="confirmation-item">
                              <span className="confirmation-label">WIFI</span>
                              <span className="confirmation-value">{customerDetails.wifi ? <i className="icon ion-checkmark-round"></i> : <i className="icon ion-close-round"></i>}</span>
                            </div>
                          </Box>
                          <Box
                            col={12}
                            sm={4}>
                            <div className="confirmation-item">
                              <span className="confirmation-label">Baby Seat</span>
                              <span className="confirmation-value">{customerDetails.babySeat ? <i className="icon ion-checkmark-round"></i> : <i className="icon ion-close-round"></i>}</span>
                            </div>
                          </Box>
                          <Box
                            col={12}
                            sm={4}>
                            <div className="confirmation-item">
                              <span className="confirmation-label">GPS</span>
                              <span className="confirmation-value">{customerDetails.gps ? <i className="icon ion-checkmark-round"></i> : <i className="icon ion-close-round"></i>}</span>
                            </div>
                          </Box>
                          <Box
                            col={12}
                            sm={12}>
                            <div className="confirmation-item">
                              <span className="confirmation-label">Journey Details</span>
                              <span className="confirmation-value">-</span>
                            </div>
                          </Box>
                        </Flex>
                      </div>
                    </Section>
                    <Button
                      mb={1}
                      onClick={props.handleFav}
                      backgroundColor={CoreVariable.color}
                      color='white'
                      big
                      children='Add this to Favorite' />
                    <Space x={1} />
                    <ButtonOutline
                      to="/account/bookings"
                      is={Link}
                      mb={1}
                      style={IndexLayout.caps}
                      color={CoreVariable.color}
                      rounded
                      big
                      children="Booking History" />
                  </div>
                </Box>
              </Flex>
            </div> }
        </Box>
      </Flex>
    </div>
  );
}
