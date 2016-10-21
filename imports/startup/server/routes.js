import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/nimble:restivus';
import { getBooking, payBooking } from '/imports/api/methods';

// Global API configuration
let Api = new Restivus({
  apiPath: 'api/limo/',
  prettyJson: true
});

Api.addRoute('processPayment', { authRequired: false }, {
  post: {
    authRequired: false,
    action: function () {
      // get the payment details from MOLPay
      const details = this.bodyParams;
      const status = details.status === '00' ? 'success' : 'failed';
      const query = Object.keys(details).map(function(key) {
        return key + '=' + encodeURIComponent(details[key]);
      }).join('&');

      /**
        * Status: 00 -> success
        *         11 -> error/failed
        *
        */

      // redirect the user to payment confirmation page
      return {
        statusCode: 302,
        headers: {
          'Content-Type': 'text/plain',
          'Location': '/limo/processPayment?' + query
        },
        body: 'Redirecting..'
      };
    }
  }
});
