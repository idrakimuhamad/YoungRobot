import React from 'react';
import { Link } from 'react-router';
import {
  Base,
  Section,
  Button,
  ButtonOutline,
  PageHeader,
  Heading,
  Message,
  Text,
  Space,
  Close } from 'rebass';
import { Flex, Box } from 'reflexbox';
import moment from 'moment';
import { publicEndpoint } from '../../api/endpoints';
import { Loader } from '../components/Loader';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';

export const LimoConfirmSummary = (props) => {
  const { booking, customerDetails, selectedLimo } = props;
  const totalPrice = booking.grossTotalCost;
  const imgUrl = selectedLimo
    && selectedLimo.imageBase64
    && selectedLimo.imageBase64.length ?
    publicEndpoint + '/syntronic-api-v1/catalogs/Limo/products/' + selectedLimo.id + '/image' :
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
            {props.confirmBookingLoading ?
              <Flex
                justify="center"
                align="center"
                column
                >
                <Loader />
                <Heading
                  level={4}
                  m={0}
                  mt={1}
                  style={IndexLayout.caps}
                  children="Directing you to the payment gateaway..." />
              </Flex> :
              <div className="limo-inner">
                <PageHeader
                  description="Review your booking details before payment"
                  heading="Confirm Details"
                  px={2}
                  />
                  {props.error ?
                    <Flex
                      justify="center"
                      align="center"
                      p={2}
                      column
                      >
                      <Message
                        inverted
                        rounded
                        theme="error" >
                        {props.errorMessage.length ?
                            props.errorMessage :
                            <Text>Opps.. There seems to be a problem in retrieving the data from the server. Check your connection or email our support.</Text>
                           }
                        <Space
                          auto
                          x={1}
                        />
                        <Close />
                      </Message>
                    </Flex>
                    :
                    (props.loading ?
                      <Flex
                        justify="center"
                        align="center"
                        column
                        >
                        <Loader />
                        <Heading
                          level={4}
                          m={0}
                          mt={1}
                          style={IndexLayout.caps}
                          children={props.loadingMessage} />
                      </Flex> :
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
                                  {/* <b>{props.selectedLimo.passenger}</b> */}
                                </span>
                                <span className="luggage">
                                  <i className="icon ion-briefcase"></i>
                                  {/* <b>{props.selectedLimo.luggage}</b> */}
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
                                children={'MYR' + totalPrice}/>
                              <Box
                                col={12}
                                py={2}>
                                <ButtonOutline
                                  onClick={props.handleCancel}
                                  style={IndexLayout.caps}
                                  color={CoreVariable.color}
                                  backgroundColor="#fff"
                                  rounded
                                  big
                                  children="Cancel Booking" />
                                <Space x={1} auto />
                                <ButtonOutline
                                  to={'/limo/query?order=' + booking.orderId + '&vehicle=' + selectedLimo.id}
                                  is={Link}
                                  style={IndexLayout.caps}
                                  color={CoreVariable.color}
                                  rounded
                                  big
                                  children="Return and edit" />
                              </Box>
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
                                        <span className="confirmation-value">{customerDetails.customerDetails.name}</span>
                                      </div>
                                    </Box> */}
                                    <Box
                                      col={12}
                                      sm={12}>
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
                                        <span className="confirmation-value">{customerDetails.dropOffAddress ? customerDetails.dropOffAddress : '-'} {customerDetails.dropOffZipcode ? ', ' + customerDetails.dropOffZipcode : '-' }</span>
                                      </div>
                                    </Box>
                                    <Box
                                      col={12}
                                      sm={6}>
                                      <div className="confirmation-item">
                                        <span className="confirmation-label">Flight Number</span>
                                        <span className="confirmation-value">-</span>
                                      </div>
                                    </Box>
                                    <Box
                                      col={12}
                                      sm={6}>
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
                              onClick={props.handleConfirm}
                              backgroundColor={CoreVariable.color}
                              color='white'
                              big
                              children='Proceed to Payment' />
                          </div>
                        </Box>
                      </Flex>)
                  }
              </div>
            }

          </Box>
        </Flex>
    </div>
  );
}
