import React, { Component } from 'react';
import { browserHistory } from 'react-router';
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
  Select } from 'rebass';
import { Flex, Box } from 'reflexbox';
import moment from 'moment';
import Datetime from 'react-datetime';
import { Loader } from '../components/Loader';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';

export class TourBooking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: props.userType,
      pickupLocation: props.locationsList,
      locationsList: props.locationsList,
      pickupDate: moment().startOf('hour').add(1, 'hours'),
      pickupValue: '',
      pickupSelected: '',
      pickupSuggestions: [],
      submitTourLoading: false
    }
    this.getSuggestions = this.getSuggestions.bind(this);
    this.handleBooking = this.handleBooking.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
  }

  handleDate(type, date) {
    if (type === 'pickup') {
      this.setState({
        pickupDate: date
      });
    }
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const places = this.state.locationsList;
    const regex = new RegExp('^' + inputValue, 'i');

    return places.map(section => {
      return {
        title: section.title,
        locations: section.suggestions.filter(place => regex.test(place.name))
      };
    })
    .filter(section => section.locations.length > 0);
  }

  getSectionSuggestions(section) {
    return section.locations;
  }

  getSuggestionValue(suggestion) { // when suggestion is selected, this function tells
    return suggestion.name;                 // what should be the value of the input
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }

  renderSectionTitle(section) {
    return (
      <strong className="autosuggest-title">{section.title}</strong>
    );
  }

  handlePickupLocationChange(event, { newValue }) {
    if (!newValue.length) {
      this.setState({
        pickupSelected: '',
        pickupSetPrice: false
      });
      // this.getTotalFare({ location: this.state.dropSelected }, 'drop');
    }
    this.setState({
      pickupValue: newValue
    });
  }

  handleSuggestionPickupUpdateRequest({ value }) {
    this.setState({
      pickupSuggestions: this.getSuggestions(value)
    });
  }

  handleSelectedPickup(event, { suggestion, suggestionValue, sectionIndex, method }) {
    this.setState({
      pickupSelected: suggestion,
      pickupZipcode: suggestion.zip
    });
  }

  handleArrivalTime(time) {
    this.setState({
      flightArrivalTime: moment(time).format('HH:mm')
    });
  }

  handleOptions(event) {
    switch (event.target.name) {
      case 'wifi':
        this.setState({
          wifi: event.target.checked
        });
        break;
      case 'baby_seat':
        this.setState({
          babySeat: event.target.checked
        });
        break;
      case 'gps':
        this.setState({
          gps: event.target.checked
        });
        break;
      default:
        break;
    }
  }

  handleBooking() {
    // this is where we call the API. For this mockup let's just simulate it
    this.setState({
      submitTourLoading: true
    });

    let goToConfirm = () => {
      return browserHistory.push('/tour/confirm');
    }

    setTimeout(function() {
      goToConfirm();
    }, 5000);
  }

  render() {
    const {
            pickupValue,
            pickupSuggestions,
            userType } = this.state;

    const inputPickupProps = {
      placeholder: 'Pickup Location',
      value: pickupValue,
      onChange: this.handlePickupLocationChange.bind(this)
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
                <PageHeader
                  description="Select and fill the appropriate details"
                  heading="Personal Details"
                  px={2}
                  />
                  {this.state.submitTourLoading ?
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
                    <Flex wrap>
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
                                rounded={false}
                                type="text"
                                />
                              <Input
                                label="Contact No"
                                name="contact-no"
                                placeholder="Contact No"
                                rounded={false}
                                type="tel"
                                />
                              <Input
                                label="Email"
                                name="email"
                                placeholder="Email"
                                rounded={false}
                                type="email"
                                />
                              <Label>
                                Tour Date
                                <Datetime
                                  dateFormat="DD/MM/YYYY"
                                  timeFormat="HH:mm"
                                  defaultValue={this.state.pickupDate}
                                  inputProps={{
                                    placeholder: 'Tour date and time',
                                    name: 'pickupDate'
                                  }}
                                  onChange={this.handleDate.bind(this, 'pickup')} />
                              </Label>
                              <Input
                                label="Adult"
                                name="adult"
                                placeholder="Adult"
                                rounded={false}
                                type="number"
                                />
                               <Input
                                 label="Children"
                                 name="children"
                                 placeholder="children"
                                 rounded={false}
                                 type="number"
                                 />
                            </div>
                          </Section>
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
                                  <Autosuggest
                                    multiSection={true}
                                    suggestions={pickupSuggestions}
                                    onSuggestionsUpdateRequested={this.handleSuggestionPickupUpdateRequest.bind(this)}
                                    getSuggestionValue={this.getSuggestionValue.bind(this)}
                                    renderSuggestion={this.renderSuggestion.bind(this)}
                                    renderSectionTitle={this.renderSectionTitle.bind(this)}
                                    getSectionSuggestions={this.getSectionSuggestions.bind(this)}
                                    onSuggestionSelected ={this.handleSelectedPickup.bind(this)}
                                    inputProps={inputPickupProps} />
                                  <Input
                                    label=""
                                    name="pickup_zipcode"
                                    placeholder="Zipcode"
                                    value={this.state.pickupZipcode}
                                    rounded={false}
                                    type="text"
                                    onChange={this.handleZip}
                                    />
                                </Label>
                              </div>
                            </Section>
                          </div>
                          <Button
                            backgroundColor={CoreVariable.color}
                            color='white'
                            onClick={this.handleBooking}
                            big
                            children='Book Now' />
                        </div>
                      </Box>
                    </Flex>
                  }
              </div>
            </Box>
          </Flex>
      </div>
    )
  }
}
