import React from 'react';
import { browserHistory, Link } from 'react-router';
import {
  Base,
  Section,
  Button,
  PageHeader,
  Panel,
  PanelHeader,
  Heading,
  Space,
  LinkBlock,
  Media,
  Message,
  Close,
  Text,
  Container,
  ButtonOutline } from 'rebass';
import { Flex, Box } from 'reflexbox';
import moment from 'moment';
import { Loader } from './Loader';
import { publicEndpoint } from '../../api/endpoints';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';

export const BookingList = ({
  error,
  errorMessage,
  bookingList,
  bookingSingle,
  loading,
  loadingSingle,
  closeBooking,
  selectedLimo,
  handleCancel,
  orderNo }) => {
  const bookingContainerClass = bookingSingle ? 'booking-item-details animated fadeInDown' : 'booking-item-details animated fadeOutUp';
  const imgUrl = selectedLimo ? (selectedLimo.imageBase64 && selectedLimo.imageBase64.length ?
    publicEndpoint + '/syntronic-api-v1/catalogs/Limo/products/' + selectedLimo.id + '/image' :
    'https://placehold.it/450x450') : null;

  const cancelBooking = (id) => {
    console.log(id);
    // handleCancel(id)
  };

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
          <Container>
            <PageHeader
              description="List of booking history you've made"
              heading="Booking History"
              px={2}
              />
              {error ?
                <Flex
                  justify="center"
                  align="center"
                  column
                  >
                  <Message
                    inverted
                    rounded
                    theme="error" >
                    {errorMessage.length ?
                        errorMessage :
                        <Text>Opps.. There seems to be a problem in retrieving the data from the server. Check your connection or email our support.</Text>
                       }
                    <Space
                      auto
                      x={1}
                    />
                    <Close />
                  </Message>
                </Flex> : null}
            {loading ?
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
                children="Loading..." />
            </Flex> :
            <Flex
              align="center"
              justify="center">
              <Box
                col={12}
                sm={10}>
              {bookingList.map((booking) => {
                const bookingItemClass = bookingSingle && bookingSingle.orderId === booking.orderId ? 'booking-item selected' : 'booking-item';
                return (
                  <div className={bookingItemClass}
                    key={booking.id}>
                    <LinkBlock
                      to={'/account/bookings?order=' + booking.orderId}
                      is={Link}
                      p={2}
                      >
                      <Media
                        align="center"
                        mb={0}
                        //img={publicEndpoint + '/syntronic-api-v1/catalogs/Limo/products/' + booking.cartItems[0].masterProductId + '/image'}
                        >
                        <Heading level={3}>
                          {booking.orderId}
                        </Heading>
                        <Heading level={6}>
                          <Text>RM {booking.grossTotalCost}</Text>
                          <Text><span className="capitalize">{booking.status}</span></Text>
                          <Text><span className="capitalize">{booking.paymentStatus}</span></Text>
                          <Text>11/10/2016 12:30pm</Text>
                        </Heading>
                        {loadingSingle && (orderNo === booking.orderId) ?
                          <div className="booking-item-loader">
                            <Loader
                                small/>
                          </div> : null
                        }
                      </Media>
                    </LinkBlock>
                    {bookingSingle && (bookingSingle.orderId === booking.orderId) && selectedLimo ?
                      <div className={bookingContainerClass}>
                        <Flex
                          p={2}
                          wrap>
                          <Box
                            col={12}
                            sm={12}
                            md={6}
                            p={2}>
                            <img src={imgUrl} alt={selectedLimo.name}/>
                          </Box>
                          <Box
                            col={12}
                            sm={12}
                            md={6}
                            p={2}>
                            <Heading
                              level={4}
                              alt>
                              Pickup Time
                            </Heading>
                            <Heading
                              level={4}
                              mb={1}>
                              {moment(bookingSingle.cartItems[0].customDetails.pickupTime).format('DD-MM-YYYY HH:mm')}
                            </Heading>
                            <Heading
                              level={4}
                              alt>
                              Pickup
                            </Heading>
                            <Heading
                              level={4}
                              mb={1}>
                              {bookingSingle.cartItems[0].customDetails.pickupAddress}, {bookingSingle.cartItems[0].customDetails.pickupZipcode}
                            </Heading>
                            <Heading
                              level={4}
                              alt>
                              Dropoff
                            </Heading>
                            <Heading
                              level={4}
                              mb={1}>
                              {bookingSingle.cartItems[0].customDetails.dropOffAddress}, {bookingSingle.cartItems[0].customDetails.dropOffZipcode}
                            </Heading>
                            <Heading
                              level={4}
                              alt>
                              Passenger Name
                            </Heading>
                            <Heading
                              level={4}
                              mb={1}>
                              {bookingSingle.cartItems[0].customDetails.passengerName}
                            </Heading>
                            <Heading
                              level={4}
                              alt>
                              Email
                            </Heading>
                            <Heading
                              level={4}
                              mb={1}>
                              {bookingSingle.cartItems[0].customDetails.passengerEmail}
                            </Heading>
                            <Heading
                              level={4}
                              alt>
                              Contact
                            </Heading>
                            <Heading
                              level={4}
                              mb={1}>
                              {bookingSingle.cartItems[0].customDetails.passengerHP}
                            </Heading>
                            <Heading
                              level={4}
                              alt>
                              Passenger
                            </Heading>
                            <Heading
                              level={4}>
                              {bookingSingle.cartItems[0].customDetails.totalPassengers}
                            </Heading>
                            {bookingSingle.status !== 'cancelled' && bookingSingle.status !== 'aborted' ?
                              <Button
                                mt={2}
                                backgroundColor={CoreVariable.color}
                                color='white'
                                onClick={handleCancel}
                                big
                                children='Cancel Booking' />
                                : null
                            }
                          </Box>
                          {/* <Media
                            align="center"
                            mb={0}
                            img={imgUrl}
                            >


                          </Media> */}
                        </Flex>
                      </div>
                      : null
                    }
                  </div>
                );
              })}
              </Box>
            </Flex>
          }
          </Container>
          </div>
        </Box>
      </Flex>
    </div>
  );
}
