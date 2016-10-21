import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { HTTP } from 'meteor/http';
import { Endpoint } from './endpoints';

/**
  * ACCOUNT RELATED METHODS
  */

export const userLogin = new ValidatedMethod({
  name: 'user.login',
  validate(args) {
    check(args, {
      username: String,
      password: String
    });
  },
  run({ username, password }) {
    // call the API
    if (Meteor.isServer) {
      try {
        return HTTP.call('POST', Endpoint + '/tms-api-v1/Account/customer_login',
          {
            data: {
              username: username,
              password: password
            }
          });
      } catch (e) {
        // console.error(e);
        throw new Meteor.Error(e.response.statusCode, e.response.content);
      }
    }
  }
});

export const userLogout = new ValidatedMethod({
  name: 'user.logout',
  validate(token) {
    check(token, String);
  },
  run(token) {
    // call the API
    if (Meteor.isServer) {
      try {
        return HTTP.call('POST', Endpoint + '/tms-api-v1/Account/Logout', {
          headers: {
            Authorization: token
          }
        });
      } catch (e) {
        // console.error(e);
        throw new Meteor.Error(e.response.statusCode, e.response.content);
      }
    }
  }
});

export const userInfo = new ValidatedMethod({
  name: 'user.info',
  validate(token) {
    check(token, String);
  },
  run(token) {
    // call the API
    if (Meteor.isServer) {
      try {
        return HTTP.call('GET', Endpoint + '/tms-api-v1/Account/UserInfo', {
          headers: {
            Authorization: token
          }
        });
      } catch (e) {
        // console.error(e);
        throw new Meteor.Error('ERROR', e.response.content);
      }
    }
  }
});

export const userUpdate = new ValidatedMethod({
  name: 'user.update',
  validate(args) {
    check(args, {
      token: String,
      body: Object
    });
  },
  run({ token, body }) {
    // call the API
    if (Meteor.isServer) {
      try {
        return HTTP.call('PUT', Endpoint + '/tms-api-v1//userprofile', {
          headers: {
            Authorization: token
          },
          data: body
        });
      } catch (e) {
        // console.error(e);
        throw new Meteor.Error('ERROR', e.response.content);
      }
    }
  }
});

export const createUser = new ValidatedMethod({
  name: 'user.create',
  validate(body) {
    check(body, Object);
  },
  run(body) {
    // call the API
    if (Meteor.isServer) {
      try {
        return HTTP.call('POST', Endpoint + '/tms-api-v1/Account/Register',
          {
            data: body
          });
      } catch (e) {
        // console.error(e);
        throw new Meteor.Error('ERROR', e.response.content);
      }
    }
  }
});

export const createProfile = new ValidatedMethod({
  name: 'profile.create',
  validate(body) {
    check(body, Object);
  },
  run(body) {
    // call the API
    if (Meteor.isServer) {
      try {
        return HTTP.call('POST', Endpoint + '/tms-api-v1/userprofile',
          {
            data: body
          });
      } catch (e) {
        // console.error(e);
        throw new Meteor.Error('ERROR', e.response.data ? e.response.data.Message : e.response.content);
      }
    }
  }
});

export const changePassword = new ValidatedMethod({
  name: 'password.change',
  validate(args) {
    check(args, {
      token: String,
      oldPassword: String,
      newPassword: String
    });
  },
  run({ token, oldPassword, newPassword }) {
    // call the API
    if (Meteor.isServer) {
      try {
        return HTTP.call('POST', Endpoint + '/tms-api-v1/Account/ChangePassword?oldPassword=' + oldPassword + '&newPassword=' + newPassword, {
          headers: {
            Authorization: token
          }
        });
      } catch (e) {
        // console.error(e);
        throw new Meteor.Error('ERROR', e.response.data ? e.response.data.Message : e.response.content);
      }
    }
  }
});

export const resetPassword = new ValidatedMethod({
  name: 'password.reset',
  validate(args) {
    check(args, {
      username: String,
      email: String
    });
  },
  run({ username, email }) {
    // call the API
    if (Meteor.isServer) {
      try {
        return HTTP.call('PUT', Endpoint + '/tms-api-v1/Account/' + username + '?action=reset_password&email_address=' + email);
      } catch (e) {
        // console.error(e);
        throw new Meteor.Error('ERROR', e.response.data ? e.response.data.Message : e.response.content);
      }
    }
  }
});

/**
  * VEHICLE RELATED METHODS
  */
export const vehicleList = new ValidatedMethod({
  name: 'vehicle.list',
  validate(args) {
    check(args, {
      type: String,
      token: String
    });
  },
  run({ type, token }) {
    // call the API
    if (Meteor.isServer) {
      try {
        return HTTP.call('GET', Endpoint + '/syntronic-api-v1/catalogs/' + type, {
          headers: {
            Authorization: token
          }
        });
      } catch (e) {
        // console.error(e);
        if (e.response.statusCode == 404) {
          throw new Meteor.Error('NO_RECORDS', 'There are no records for this request');
        } else if (e.response.statusCode == 401) {
          throw new Meteor.Error('NO_AUTHORIZATION', e.response.data ? e.response.data.Message : e.response.content);
        } else if (e.response.statusCode == 500) {
          throw new Meteor.Error('SERVER_ERROR', e.response.data ? e.response.data.Message : e.response.content);
        } else {
          throw new Meteor.Error('ERROR', e.response.content);
        }
      }
    }
  }
});

export const vehicleDetails = new ValidatedMethod({
  name: 'vehicle.details',
  validate(args) {
    check(args, {
      type: String,
      id: Number,
      token: String
    });
  },
  run({ type, id, token }) {
    // call the API
    if (Meteor.isServer) {
      try {
        return HTTP.call('GET', Endpoint + '/syntronic-api-v1/catalogs/' + type + '/products/' + id, {
          headers: {
            Authorization: token
          }
        });
      } catch (e) {
        // console.error(e);
        throw new Meteor.Error('ERROR', e.response.content);
      }
    }
  }
});

// LOCATION RELATED METHODS

export const getLocations = new ValidatedMethod({
  name: 'location.query',
  validate(args) {
    check(args, {
      query: String,
      token: String
    });
  },
  run({ query, token }) {
    // call the API
    if (Meteor.isServer) {
      try {
        return HTTP.call('GET', Endpoint + '/syntronic-api-v1/maps/locations?query=' + query, {
          headers: {
            Authorization: token
          }
        });
      } catch (e) {
        // console.error(e);
        throw new Meteor.Error(e.response.statusCode, e.response.content);
      }
    }
  }
});


// BOOKING RELATED METHODS

export const createBooking = new ValidatedMethod({
  name: 'booking.create',
  validate(args) {
    check(args, {
      bookingType: String,
      token: String,
      body: Object
    });
  },
  run({ bookingType, body, token }) {
    // call the API
    if (Meteor.isServer) {
      // decide which endpoint based on the booking type
      let product = bookingType === 'point' ? 'taxi' :
                    (bookingType === 'transfer' ? 'limo' :
                    (bookingType === 'hourly' || bookingType === 'daily' ? 'rental' : ''));
      try {
        return HTTP.call('POST', Endpoint + '/syntronic-api-v1/orders/' + product, {
          headers: {
            Authorization: token
          },
          data: body
        });
      } catch (e) {
        // console.error(e);
        if (e.response.statusCode == 400) {
          throw new Meteor.Error('INVALID_PARAMETERS', e.response.content);
        }
      }
    }
  }
});

export const updateBooking = new ValidatedMethod({
  name: 'booking.update',
  validate(args) {
    check(args, {
      id: Number,
      bookingType: String,
      token: String,
      body: Object
    });
  },
  run({ id, bookingType, body, token }) {
    // call the API
    if (Meteor.isServer) {
      // decide which endpoint based on the booking type
      let product = bookingType === 'point' ? 'taxi' :
                    (bookingType === 'transfer' ? 'limo' :
                    (bookingType === 'hourly' || bookingType === 'daily' ? 'rental' : ''));
      try {
        return HTTP.call('PUT', Endpoint + '/syntronic-api-v1/orders/' + product + '/' + id, {
          headers: {
            Authorization: token
          },
          data: body
        });
      } catch (e) {
        // console.error(e);
        if (e.response.statusCode == 400) {
          throw new Meteor.Error('INVALID_PARAMETERS', e.response.content);
        } else {
          throw new Meteor.Error('ERROR', e.response.content);
        }
      }
    }
  }
});

/**
  * GET ALL Bookings based on the user
  */
export const getBookings = new ValidatedMethod({
  name: 'booking.getAll',
  validate(token) {
    check(token, String);
  },
  run(token) {
    // call the API
    if (Meteor.isServer) {
      try {
        return HTTP.call('GET', Endpoint + '/syntronic-api-v1/orders', {
          headers: {
            Authorization: token
          }
        });
      } catch (e) {
        // console.error(e);
        throw new Meteor.Error('ERROR', e.response.content);
      }
    }
  }
});

/**
  * GET Bookings based on the booking no/order code
  */
export const getBooking = new ValidatedMethod({
  name: 'booking.get',
  validate(args) {
    check(args, {
      orderId: String,
      token: String
    });
  },
  run({ orderId, token }) {
    // call the API
    if (Meteor.isServer) {
      try {
        return HTTP.call('GET', Endpoint + '/syntronic-api-v1/orders/' + orderId, {
          headers: {
            Authorization: token
          }
        });
      } catch (e) {
        // console.error(e);
        if (e.response.statusCode == 404) {
          throw new Meteor.Error('BOOKING_NOT_EXISTS', 'The booking no does not exists in record');
        } else if (e.response.statusCode == 401) {
          throw new Meteor.Error('NO_AUTHORIZATION', e.response.data ? e.response.data.Message : e.response.content);
        } else if (e.response.statusCode == 500) {
          throw new Meteor.Error('SERVER_ERROR', e.response.data ? e.response.data.Message : e.response.content);
        } else {
          throw new Meteor.Error(e.response.statusCode ? e.response.statusCode : 'ERROR', e.response.content);
        }
      }
    }
  }
});

export const payBooking = new ValidatedMethod({
  name: 'booking.pay',
  validate(args) {
    check(args, {
      id: Number,
      token: String,
      body: Object
    });
  },
  run({ id, token, body }) {
    // call the API
    if (Meteor.isServer) {
      try {
        return HTTP.call('PUT', Endpoint + '/syntronic-api-v1/orders/' + id + '?action=payment', {
            headers: {
              Authorization: token
            },
            data: body
          });
      } catch (e) {
        // console.error(e);
        if (e.response.statusCode == 404) {
          throw new Meteor.Error('BOOKING_NOT_EXISTS', 'The booking no does not exists in record');
        } else if (e.response.statusCode == 401) {
          throw new Meteor.Error('NO_AUTHORIZATION', e.response.data ? e.response.data.Message : e.response.content);
        } else if (e.response.statusCode == 500) {
          throw new Meteor.Error('SERVER_ERROR', e.response.data ? e.response.data.Message : e.response.content);
        } else if (e.response.statusCode) {
          throw new Meteor.Error(e.response.statusCode, e.response.data ? e.response.data.Message : e.response.content);
        } else {
          throw new Meteor.Error('NETWORK ERROR', e.response.content);
        }
      }
    }
  }
});

export const abortBooking = new ValidatedMethod({
  name: 'booking.abort',
  validate(args) {
    check(args, {
      id: Number,
      token: String
    });
  },
  run({ id, token }) {
    // call the API
    if (Meteor.isServer) {
      try {
        return HTTP.call('PUT', Endpoint + '/syntronic-api-v1/orders/' + id + '?action=abort', {
            headers: {
              Authorization: token
            }
          });
      } catch (e) {
        // console.error(e);
        throw new Meteor.Error(e.response.statusCode, e.response.data ? e.response.data.Message : e.response.content);
      }
    }
  }
});

export const cancelBooking = new ValidatedMethod({
  name: 'booking.cancel',
  validate(args) {
    check(args, {
      id: Number,
      token: String
    });
  },
  run({ id, token }) {
    // call the API
    if (Meteor.isServer) {
      try {
        return HTTP.call('PUT', Endpoint + '/syntronic-api-v1/orders/' + id + '?action=cancel', {
            headers: {
              Authorization: token
            }
          });
      } catch (e) {
        // console.error(e);
        throw new Meteor.Error(e.response.statusCode, e.response.data ? e.response.data.Message : e.response.content);
      }
    }
  }
});

// GENERATE VCODE RELATED METHODS

export const getVcode = new ValidatedMethod({
  name: 'vcode.get',
  validate(args) {
    check(args, {
      orderId: String,
      amount: String
    });
  },
  run(args) {
    // get the vcode
    return Meteor.call('generateVcode', args);
  }
});
