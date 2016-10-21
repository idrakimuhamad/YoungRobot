import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';
import { vehicleDetails, getLocations, createBooking, getBooking, updateBooking } from '../../api/methods';
import { LimoBookingForm } from '../components/LimoBookingForm';

export class LimoBooking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: props.userType,
      isLogin: props.isLogin,
      token: props.token,
      vehicleId: +props.location.query.vehicle,
      isEdit: !!props.location.query.order,
      orderNo: props.location.query.order,
      selectedLimo: {},
      maxPassenger: 6,
      totalPrice: 0,
      pickupLocation: [],
      dropoffLocation: [],
      pickupName: '',
      pickupZipcode: '',
      dropName: '',
      dropZipcode: '',
      locationsList: [],
      bookingType: 'point',
      pickupDate: moment().startOf('hour').add(4, 'hours'),
      returnDate: moment().startOf('hour').add(7, 'hours'),
      flightArrivalTime: '',
      selectedPickup: {},
      selectedDrop: {},
      dropValue: '',
      pickupSelected: '',
      dropSelected: '',
      pickupSuggestions: [],
      dropSuggestions: [],
      wifi: false,
      babySeat: false,
      gps: false,
      submitBookingLoading: false,
      loadingPickup: false,
      loadingDrop: false,
      loadingVehicle: false,
      customerName: '',
      passengerName: '',
      contactNo: '',
      contactEmail: '',
      passengerNo: 1,
      bookingDetails: null,
      customerDetails: null,
      error: false
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleBookingType = this.handleBookingType.bind(this);
    this.handleArrivalTime = this.handleArrivalTime.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleLocationSelected = this.handleLocationSelected.bind(this);
    this.handleOptions = this.handleOptions.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.getTotalFare = this.getTotalFare.bind(this);
    this.getVehicle = this.getVehicle.bind(this);
    this.calcHour = this.calcHour.bind(this);
    this.handleBooking = this.handleBooking.bind(this);
    this.handleEditEntry = this.handleEditEntry.bind(this);
    this.handleZip = this.handleZip.bind(this);
  }

  componentDidMount() {
    let _this = this;

    if (this.state.isLogin) {
      this.setState({
        loadingVehicle: true
      });

      if (this.state.isEdit) {
        console.log(this.state.orderNo);
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
            // check status before allow editing
            if (res.data.paymentStatus === 'unpaid' &&
                (res.data.status !== 'aborted' &&
                res.data.status !== 'cancelled')) {
                // success
                this.setState({
                  loading: false,
                  bookingDetails: res.data,
                  customerDetails: res.data.cartItems[0].customDetails
                });

                // get the vehicle details
                this.getVehicle(res.data.cartItems[0].masterProductId);
                this.handleEditEntry();
            } else {
              // redirect to booking details in history
              browserHistory.push('/account/bookings/' + res.data.id);
            }
          }
        });
      } else {
        // get the vehicle details
        this.getVehicle(this.state.vehicleId);
      }
    }
  }

  componentWillUpdate() {
    // console.log(this.props);
  }

  getVehicle(id) {
    vehicleDetails.call({
      type: 'limo',
      id: id,
      token: this.state.token
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

  handleBookingType(event) {
    this.setState({
      bookingType: event.target.name
    });

    // try to calculate the fare if its ready
    // this.calcHour();
  }

  handleLocation(event) {
    let _this = this;

    event = event.persist() || event;

    if (this.timer) clearTimeout(this.timer);

    if (event.target.name == 'pickup') {
      this.setState({
        loadingPickup: true,
        pickupName : event.target.value
      });
    } else {
      this.setState({
        loadingDrop: true,
        dropName : event.target.value
      });
    }

    if (event.target.value.length > 3) {
      this.timer = setTimeout(function() {
        getLocations.call({
          query: event.target.value,
          token: _this.state.token
        }, (err, res) => {
          if (err) {
            console.error(err);
            _this.setState({
              pickupLocation: [],
              dropoffLocation: [],
              loadingPickup: false,
              loadingDrop: false
            });
          } else {
            let location = res.data;

            // only take the top 10 from the suggestion to avoid endless list
            location = location.splice(0, 9);

            if (event.target.name == 'pickup') {
              _this.setState({
                pickupLocation: location,
                loadingPickup: false
              });
            } else {
              _this.setState({
                dropoffLocation : location,
                loadingDrop: false
              });
            }
          }
        });
      }, 500);
    } else {
      _this.setState({
        pickupLocation: [],
        dropoffLocation: [],
        loadingPickup: false,
        loadingDrop: false
      });
    }
  }

  handleLocationSelected(location, type) {
    if (type === 'pickup') {
      this.setState({
        selectedPickup: location,
        pickupZipcode: location.zipcode,
        pickupName: location.name,
        pickupLocation: [],
        loadingPickup: false
      });
    } else {
      this.setState({
        selectedDrop: location,
        dropZipcode: location.zipcode,
        dropName: location.name,
        dropoffLocation: [],
        loadingDrop: false
      });
    }
  }

  handleInput(event) {
    let _this = this;

    event = event.persist() || event;

    if (event.target.name == 'name') {
      this.setState({
        customerName: event.target.value
      });
    } else if (event.target.name == 'passengers_name') {
      this.setState({
        passengerName: event.target.value
      });
    } else if (event.target.name == 'contact_no') {
      this.setState({
        contactNo: event.target.value
      });
    } else if (event.target.name == 'contact_email') {
      this.setState({
        contactEmail: event.target.value
      });
    } else if (event.target.name == 'total_passenger') {
      this.setState({
        passengerNo: event.target.value
      });
    }
  }

  handleDate(type, date) {
    if (type === 'pickup') {
      this.setState({
        pickupDate: date
      });
    } else if (type === 'return') {
      // make sure the date is on not less than pickup
      const pickupDate = this.state.pickupDate;
      if (date.isSameOrAfter(pickupDate)) {
        this.setState({
          returnDate: date
        });
      } else {
        // alert('The return date and time must be AFTER the pickup date time');
      }
    }
  }

  calcHour() {
    const start = this.state.pickupDate,
          end = this.state.returnDate;

    let duration, hours;

    if (start && end) {
      duration = moment.duration(end.diff(start)),
      hours = duration.asHours();

      return +(hours).toFixed(0);
    } else {
      return 0;
    }
  }

  getTotalFare() {
    const type = this.state.bookingType,
          pickup = this.state.pickupSelected,
          drop = this.state.dropSelected,
          hour = this.calcHour(),
          selectedLimo = this.state.selectedLimo,
          userType = this.state.userType;

    let price = 0;

    if (type === 'transfer') {
      if (pickup && pickup.type === 'airport') {
        price = (pickup.value === 'klia') ? selectedLimo.price[userType].klia.fromAirport : selectedLimo.price[userType].subang.fromAirport;
      } else if (drop && drop.type === 'airport') {
        price = (drop.value === 'klia') ? selectedLimo.price[userType].klia.toAirport : selectedLimo.price[userType].subang.toAirport;
      } else if ((pickup && drop) && (pickup.type !== 'airport' && drop.type !== 'airport')) {
        console.log('At least one airport needed to be chose for transfer');
      }
    }

    if (type === 'point') {
      price = selectedLimo.price[userType].hourly.withinKL;
    }

    if (type === 'hourly') {
      if (hour) {
        if (hour < 4) {
          price = selectedLimo.price[userType].hourly.withinKL * 4;
        } else {
          price = selectedLimo.price[userType].hourly.withinKL * hour;
        }
      }
    }

    if (type === 'daily') {
      if (hour && hour <= 12) {
        price = selectedLimo.price[userType].daily.withinKL;
      } else {
        price = 0;
        console.log('For daily usage, maximum hours is 12 hours. Current selection is ' + hour + ' hours');
      }
    }
    return price;
  }

  handleArrivalTime(time) {
    this.setState({
      flightArrivalTime: moment(time).format('HH:mm')
    });
  }

  handleZip(event) {
    if (event.target.name === 'pickup_zipcode') {
      this.setState({
        pickupZipcode: event.target.value
      });
    } else {
      this.setState({
        dropZipcode: event.target.value
      });
    }
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

  handleEditEntry() {
    if (this.state.isEdit) {
      const { customerDetails, bookingDetails } = this.state;
      this.setState({
        customerName: customerDetails.passengerName,
        passengerName: customerDetails.passengerName,
        contactNo: customerDetails.passengerHP,
        contactEmail: customerDetails.passengerEmail,
        passengerNo: customerDetails.totalPassengers,
        totalPrice: bookingDetails.totalNett,
        pickupName: customerDetails.pickupAddress,
        pickupZipcode: customerDetails.pickupZipcode,
        dropName: customerDetails.dropOffAddress,
        dropZipcode: customerDetails.dropOffZipcode,
        wifi: false,
        babySeat: false,
        gps: false,
        pickupDate: customerDetails.pickupTime ? moment(customerDetails.pickupTime) : null,
        returnDate: customerDetails.dropOffTime ? moment(customerDetails.dropOffTime) : null,
      });
    }
  }

  handleBooking() {
    /**
      * Data JSON
      *
      * TAXI
      *
      *
        "pickup_address": "sample string 2",
        "pickup_zipcode": 1,
        "dropoff_address": "sample string 3",
        "dropoff_zipcode": 1,
        "passenger_name": "sample string 4",
        "total_passengers": 1,
        "passenger_hp": "sample string 5",
        "passenger_email": "sample string 6",
        "rental_hours": 1,
        "pickup_time": "2016-09-08T17:53:46.8447143+08:00",
        "dropoff_time": "2016-09-08T17:53:46.8447143+08:00",
        "master_rental_area_id": 1,
        "transfer_pickup_id": 1,
        "g_vehicle_class_id": 1,
        "g_location_pickup_id": 1,
        "g_location_g_zipcodes_id": 1,
        "g_location_dropoff_id": 1,
        "g_location_g_zipcodes_id1": 1,
        "transfer_dropoff_id": 1,
        "ops_transaction_id": 7,
        "g_booking_type_id": 8,
        "product_id": 9
      *
      * LIMO
      *
      *
        "pickup_address": "sample string 2",
        "pickup_zipcode": 1,
        "dropoff_address": "sample string 3",
        "dropoff_zipcode": 1,
        "passenger_name": "sample string 4",
        "total_passengers": 1,
        "passenger_hp": "sample string 5",
        "passenger_email": "sample string 6",
        "rental_hours": 1,
        "pickup_time": "2016-09-08T17:55:31.1172416+08:00",
        "dropoff_time": "2016-09-08T17:55:31.1172416+08:00",
        "master_rental_area_id": 1,
        "transfer_pickup_id": 1,
        "g_vehicle_class_id": 1,
        "g_location_pickup_id": 1,
        "g_location_g_zipcodes_id": 1,
        "g_location_dropoff_id": 1,
        "g_location_g_zipcodes_id1": 1,
        "transfer_dropoff_id": 1,
        "ops_transaction_id": 7,
        "g_booking_type_id": 8,
        "product_id": 9
      *
      *
      * RENTAL
      */


    // compile the data
    let request = {
            bookingType: this.state.bookingType,
            body: {
              dropoff_address : this.state.dropName,
              dropoff_g_city_ID: this.state.selectedDrop.id ? this.state.selectedDrop.id : null,
              dropoff_zipcode : this.state.dropZipcode,
              pickup_address : this.state.pickupName,
              pickup_g_city_ID : this.state.selectedPickup.id ? this.state.selectedPickup.id : null,
              pickup_zipcode : this.state.pickupZipcode,
              pickup_time : moment(this.state.pickupDate).format(),
              passenger_name : this.state.passengerName,
              passenger_email : this.state.contactEmail,
              passenger_hp : this.state.contactNo,
              product_id : this.state.vehicleId,
              total_passengers : this.state.passengerNo,
              rental_hours: this.state.bookingType == 'hourly' || this.state.bookingType == 'daily' ? this.calcHour() : 0
            },
            token: this.state.token
          };
    const { isEdit } = this.state;

    // reset the error if any
    this.setState({
      error: false,
      errorMessage: '',
      submitBookingLoading: true
    });

    // if edit, save the booking, else create it
    if (isEdit) {
      request.id = this.state.bookingDetails.id;
      updateBooking.call(request, (err, res) => {
        if (err) {
          this.setState({
            error: true,
            errorMessage: err.reason,
            loadingVehicle: false,
            submitBookingLoading: false
          });
        } else {
          this.setState({
            submitBookingLoading: false
          });

          // success. lets redirect
          browserHistory.push('/limo/confirm?order=' + this.state.orderNo);
        }
      });
    } else {
      // make the booking
      createBooking.call(request, (err, res) => {
        if (err) {
          this.setState({
            error: true,
            errorMessage: err.reason,
            loadingVehicle: false,
            submitBookingLoading: false
          });
        } else {
          this.setState({
            submitBookingLoading: false
          });

          // success. lets redirect
          browserHistory.push('/limo/confirm?order=' + res.data.orderId);
        }
      });
    }
  }

  render() {
    const {
      isEdit,
      error,
      errorMessage,
      customerName,
      passengerName,
      contactNo,
      contactEmail,
      passengerNo,
      totalPrice,
      selectedLimo,
      dropValue,
      pickupSuggestions,
      dropSuggestions,
      userType,
      pickupName,
      pickupZipcode,
      dropName,
      dropZipcode,
      wifi,
      babySeat,
      gps,
      pickupLocation,
      dropoffLocation,
      selectedPickup,
      selectedDrop,
      loadingVehicle,
      loadingPickup,
      loadingDrop,
      bookingType,
      submitBookingLoading,
      pickupDate,
      returnDate,
      bookingDetails,
      customerDetails } = this.state;

    // let priceClass = this.props.fixedPrice ? 'limo-price fixed' : 'limo-price',
    let  passengers = [];

    for (let i = 0; i < this.state.maxPassenger; i++) {
      passengers.push({ children: i+1, value: i+1 });
    }

    return (
      <LimoBookingForm
        error={error}
        errorMessage={errorMessage}
        bookingType={bookingType}
        selectedLimo={selectedLimo}
        pickupSuggestions={pickupSuggestions}
        dropSuggestions={dropSuggestions}
        userType={userType}
        loadingVehicle={loadingVehicle}
        loadingPickup={loadingPickup}
        loadingDrop={loadingDrop}
        submitBookingLoading={submitBookingLoading}
        handleBookingType={this.handleBookingType}
        customerName={customerName}
        passengerName={passengerName}
        contactNo={contactNo}
        contactEmail={contactEmail}
        passengerNo={passengerNo}
        passengers={passengers}
        pickupDate={pickupDate}
        returnDate={returnDate}
        handleInput={this.handleInput}
        handleDate={this.handleDate}
        handleZip={this.handleZip}
        handleLocation={this.handleLocation}
        pickupLocation={pickupLocation}
        dropoffLocation={dropoffLocation}
        handleLocationSelected={this.handleLocationSelected}
        selectedPickup={selectedPickup}
        selectedDrop={selectedDrop}
        // handleSuggestionPickupUpdateRequest={this.handleSuggestionPickupUpdateRequest.bind(this)}
        // handleSuggestionDropUpdateRequest={this.handleSuggestionDropUpdateRequest.bind(this)}
        // getSuggestionValue={this.getSuggestionValue.bind(this)}
        // renderSuggestion={this.renderSuggestion.bind(this)}
        // renderSectionTitle={this.renderSectionTitle.bind(this)}
        // getSectionSuggestions={this.getSectionSuggestions.bind(this)}
        // handleSelectedPickup={this.handleSelectedPickup.bind(this)}
        pickupName={pickupName}
        pickupZipcode={pickupZipcode}
        dropName={dropName}
        dropZipcode={dropZipcode}
        handleArrivalTime={this.handleArrivalTime}
        handleOptions={this.handleOptions}
        wifi={wifi}
        babySeat={babySeat}
        gps={gps}
        handleBooking={this.handleBooking}
        isEdit={isEdit}
        bookingDetails={bookingDetails}
        customerDetails={customerDetails}
        />
    )
  }
}
