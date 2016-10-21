import React from 'react';
import {
  Base,
  Button,
  PageHeader,
  Heading,
  Radio,
  Checkbox,
  Section,
  SectionHeader,
  Input,
  Textarea,
  Label,
  Select,
  Message,
  Space,
  Close,
  Text } from 'rebass';
import { Flex, Box } from 'reflexbox';
import moment from 'moment';
import Datetime from 'react-datetime';
import { Loader } from './Loader';
import { publicEndpoint } from '../../api/endpoints';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';

export const LimoBookingForm = (props) => {
  const { bookingDetails } = props,
        bookingId = bookingDetails ? bookingDetails.orderId : null,
        pageSub = props.isEdit && bookingId ? "Edit Booking Details - " + bookingId : "Booking Details";

  const handlePickupDate = (date) => {
    props.handleDate('pickup', date);
  };

  const handleReturnDate = (date) => {
    props.handleDate('return', date);
  };

  const handleSelected = (selected, type) => {
    props.handleLocationSelected(selected, type);
  }

  const imgUrl = props.selectedLimo
    && props.selectedLimo.imageBase64
    && props.selectedLimo.imageBase64.length ?
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
            <div className="limo-inner">
              <PageHeader
                description={props.isEdit ? "Edit your existing booking" : "Select and fill the appropriate details of your booking"}
                heading={pageSub}
                px={2}
                />
                {props.error ?
                  <Flex
                    justify="center"
                    align="center"
                    column
                    >
                    <Message
                      inverted
                      rounded
                      theme="error" >
                      {props.errorMessage.length ?
                        <Text>
                          {props.errorMessage}
                        </Text> :
                        <Text>Opps.. There seems to be a problem in retrieving the data from the server. Check your connection or email our support.</Text>
                      }
                      <Space
                        auto
                        x={1}
                      />
                      <Close />
                    </Message>
                  </Flex> : null}
                {props.submitBookingLoading ?
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
                      children="Creating your booking..." />
                  </Flex> :
                  props.loadingVehicle ?
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
                              {props.selectedLimo.name}
                            </Heading>
                          </div>
                          <span className="specs">
                            <span className="passenger" title="Excluding Driver">
                              <i className="icon ion-person-stalker"></i>
                              <b>{props.selectedLimo.passenger}</b>
                            </span>
                            <span className="luggage">
                              <i className="icon ion-briefcase"></i>
                              <b>{props.selectedLimo.luggage}</b>
                            </span>
                          </span>
                        </div>
                      </div>
                      {/* <Flex
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
                            children={'RM' + props.getTotalFare()}/>
                        </div>
                      </Flex> */}
                    </Box>
                    <Box
                      col={12}
                      sm={6}
                      p={2}>
                      <div className="limo-booking-form">
                        <Section
                          py={1}>
                          <SectionHeader
                            heading="Booking Type"
                            mt={0}
                          />
                          <div className="booking-type">
                            <Radio
                              circle
                              checked={props.bookingType === 'point'}
                              label="Point to Point"
                              name="point"
                              onChange={props.handleBookingType}
                            />
                            <Radio
                              circle
                              checked={props.bookingType === 'transfer'}
                              label="Airport Transfer"
                              name="transfer"
                              onChange={props.handleBookingType}
                            />
                            <Radio
                              circle
                              checked={props.bookingType === 'hourly'}
                              label="Hourly (Min 4 hours)"
                              name="hourly"
                              onChange={props.handleBookingType}
                            />
                            <Radio
                              circle
                              checked={props.bookingType === 'daily'}
                              label="Daily (Max 12 hours)"
                              name="daily"
                              onChange={props.handleBookingType}
                            />
                          </div>
                        </Section>
                      </div>
                    </Box>
                    <Box
                      col={12}
                      sm={6}
                      p={2}>
                      <div className="limo-booking-form">
                        <Section
                          py={1}>
                          <SectionHeader
                            heading="Details"
                            mt={0}
                          />
                          <div className="booking-details">
                            <Input
                              label="Name"
                              name="name"
                              placeholder="Name"
                              defaultValue={props.customerName}
                              onBlur={props.handleInput}
                              rounded={false}
                              type="text"
                              />
                            <Input
                              label="Passenger's Name"
                              name="passengers_name"
                              placeholder="Passenger's Name"
                              defaultValue={props.passengerName}
                              onBlur={props.handleInput}
                              rounded={false}
                              type="text"
                              />
                            <Input
                              label="Contact No"
                              name="contact_no"
                              placeholder="Contact No"
                              defaultValue={props.contactNo}
                              onBlur={props.handleInput}
                              rounded={false}
                              type="tel"
                              />
                            <Input
                              label="Email"
                              name="contact_email"
                              placeholder="Email"
                              defaultValue={props.contactEmail}
                              onBlur={props.handleInput}
                              rounded={false}
                              type="email"
                              />
                            <Select
                              label="No of Passenger"
                              name="total_passenger"
                              value={props.passengerNo}
                              onChange={props.handleInput}
                              options={props.passengers} />
                            <Label>
                              Pickup Date
                              <Datetime
                                dateFormat="DD/MM/YYYY"
                                timeFormat="HH:mm"
                                defaultValue={props.pickupDate}
                                inputProps={{
                                  placeholder: 'Pickup date and time',
                                  name: 'pickupDate'
                                }}
                                onChange={handlePickupDate} />
                            </Label>

                            {(props.bookingType === 'daily' || props.bookingType === 'hourly') ?
                            <Label>
                              Return Date
                              <Datetime
                                dateFormat="DD/MM/YYYY"
                                timeFormat="HH:mm"
                                defaultValue={props.returnDate}
                                inputProps={{
                                  placeholder: 'Return date and time',
                                  name: 'returnDate'
                                }}
                                onChange={handleReturnDate} />
                              </Label> : null }
                          </div>
                        </Section>
                      </div>
                    </Box>
                    <Box
                      col={12}
                      sm={6}
                      p={2}>
                      <div className="limo-booking-form">
                        <div className="transfer-relevant">
                          <Section
                            py={1}>
                            <SectionHeader
                              heading="Locations"
                              mt={0}
                            />
                            <div className="booking-location">
                              <Label>
                                Pickup
                                {/* <Autosuggest
                                  multiSection={true}
                                  suggestions={props.pickupSuggestions}
                                  onSuggestionsUpdateRequested={props.handleSuggestionPickupUpdateRequest}
                                  getSuggestionValue={props.getSuggestionValue}
                                  renderSuggestion={props.renderSuggestion}
                                  renderSectionTitle={props.renderSectionTitle}
                                  getSectionSuggestions={props.getSectionSuggestions}
                                  onSuggestionSelected ={props.handleSelectedPickup}
                                  inputProps={props.inputPickupProps} /> */}
                                <div className="suggestion-container">
                                  <Input
                                    label=""
                                    name="pickup"
                                    placeholder="Pickup Location"
                                    rounded={false}
                                    type="text"
                                    value={props.pickupName}
                                    onChange={props.handleLocation}
                                    />
                                  {props.loadingPickup ?
                                    <span className="loading-small">
                                      <Loader
                                        small/>
                                    </span> : null}
                                  {props.pickupLocation.length ?
                                    <div className="suggestion animated fadeInDown">
                                      <ul className="suggestion-list">
                                        {props.pickupLocation.map((location) => (
                                          <li key={location.id}
                                            onClick={() => handleSelected(location, 'pickup')}>{location.name}</li>
                                        ))}
                                      </ul>
                                    </div> : null
                                  }
                                </div>
                                <Input
                                  label=""
                                  name="pickup_zipcode"
                                  placeholder="Zipcode"
                                  value={props.pickupZipcode}
                                  rounded={false}
                                  type="text"
                                  onChange={props.handleZip}
                                  />
                              </Label>
                              {/* {(props.bookingType !== 'daily' && props.bookingType !== 'hourly') ? */}
                              <Label>
                                Drop-off
                                <div className="suggestion-container">
                                  <Input
                                    label=""
                                    name="dropoff"
                                    placeholder="Drop-off Location"
                                    rounded={false}
                                    type="text"
                                    value={props.dropName}
                                    onChange={props.handleLocation}
                                    />
                                  {props.loadingDrop ?
                                    <span className="loading-small">
                                      <Loader
                                        small/>
                                    </span> : null}
                                  {props.dropoffLocation.length ?
                                    <div className="suggestion animated fadeInDown">
                                      <ul className="suggestion-list">
                                        {props.dropoffLocation.map((location) => (
                                          <li key={location.id}
                                            onClick={() => handleSelected(location, 'drop')}>{location.name}</li>
                                        ))}
                                      </ul>
                                    </div> : null
                                  }
                                </div>
                                {/* <Autosuggest
                                  multiSection={true}
                                  suggestions={props.dropSuggestions}
                                  onSuggestionsUpdateRequested={props.handleSuggestionDropUpdateRequest}
                                  getSuggestionValue={props.getSuggestionValue}
                                  renderSuggestion={props.renderSuggestion}
                                  renderSectionTitle={props.renderSectionTitle}
                                  getSectionSuggestions={props.getSectionSuggestions}
                                  onSuggestionSelected ={props.handleSelectedDrop}
                                  inputProps={props.inputDropProps} /> */}
                                <Input
                                  label=""
                                  name="drop_zipcode"
                                  placeholder="Zipcode"
                                  value={props.dropZipcode}
                                  rounded={false}
                                  type="text"
                                  onChange={props.handleZip}
                                  />
                              </Label>
                              {/* : null } */}
                            </div>
                          </Section>
                        </div>
                      </div>
                    </Box>
                    <Box
                      col={12}
                      sm={6}
                      p={2}>
                      <div className="limo-booking-form">
                        {(props.bookingType !== 'daily' && props.bookingType !== 'hourly') ?
                        <Section
                          py={1}>
                          <SectionHeader
                            heading="Flight Details"
                            description="Flight number and ETA (if any)"
                            mt={0}
                          />
                          <div className="booking-flight">
                            <Input
                              label="Flight Number"
                              name="flight-no"
                              placeholder="Flight Number"
                              rounded={false}
                              type="text"
                              />
                            <Label>
                              Arrival Time
                              <Datetime
                                dateFormat={false}
                                timeFormat="HH:mm"
                                inputProps={{
                                  placeholder: 'Arrival Time'
                                }}
                                onChange={props.handleArrivalTime} />
                            </Label>
                          </div>
                        </Section> : null }
                        <Section
                          py={1}>
                          <SectionHeader
                            heading="Options"
                            mt={0}
                          />
                          <div className="booking-options">
                            <Checkbox
                              checked={props.wifi}
                              onChange={props.handleOptions}
                              label="Wifi"
                              name="wifi"
                              theme="secondary"
                            />
                            <Checkbox
                              checked={props.babySeat}
                              onChange={props.handleOptions}
                              label="Baby Seat"
                              name="baby_seat"
                              theme="secondary"
                            />
                            <Checkbox
                              checked={props.gps}
                              onChange={props.handleOptions}
                              label="GPS"
                              name="gps"
                              theme="secondary"
                            />
                          </div>
                        </Section>
                        <Section
                          py={1}>
                          <SectionHeader
                            heading="Additional Details"
                            mt={0}
                          />
                          <div className="booking-additional-details">
                            <Textarea
                              label=""
                              name="additiona_details"
                              placeholder="Journey/Schedule Details etc"
                              hideLabel></Textarea>
                          </div>
                        </Section>
                        <Button
                          backgroundColor={CoreVariable.color}
                          color='white'
                          onClick={props.handleBooking}
                          big
                          children={props.isEdit ? 'Update Booking' : 'Book Now'} />
                      </div>
                    </Box>
                  </Flex>
                }
            </div>
          </Box>
        </Flex>
    </div>
  );
}
