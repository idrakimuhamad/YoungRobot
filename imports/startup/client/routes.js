import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { MainLayout } from '../../ui/layouts/MainLayout';
import { IndexApp } from '../../ui/layouts/IndexApp';
import { BookingAccountLayout } from '../../ui/layouts/BookingAccountLayout';
import { PagesLayout } from '../../ui/layouts/PagesLayout';
import { Index } from '../../ui/pages/Index';
import { Limo } from '../../ui/pages/Limo';
import { LimoBooking } from '../../ui/pages/LimoBooking';
import { LimoConfirm } from '../../ui/pages/LimoConfirm';
import { LimoPayment } from '../../ui/pages/LimoPayment';
import { LimoPaymentProcessing } from '../../ui/pages/LimoPaymentProcessing';
import { LimoSummary } from '../../ui/pages/LimoSummary';
import { Account } from '../../ui/pages/Account';
import { BookingHistory } from '../../ui/pages/BookingHistory';
import { Rental } from '../../ui/pages/Rental';
import { RentalBooking } from '../../ui/pages/RentalBooking';
import { RentalConfirm } from '../../ui/pages/RentalConfirm';
import { Tour } from '../../ui/pages/Tour';
import { TourBooking } from '../../ui/pages/TourBooking';
import { TourConfirm } from '../../ui/pages/TourConfirm';
import { Contact } from '../../ui/pages/Contact';
import { About } from '../../ui/pages/About';
import { Login } from '../../ui/pages/Login';
import { Logout } from '../../ui/pages/Logout';
import { Signup } from '../../ui/pages/Signup';
import { ResetPassword } from '../../ui/pages/ResetPassword';

// Uses localstorage for now to detect login (mock login)
const requireAuth = (nextState, replace) => {
  if (localStorage && !localStorage.getItem('user_id')) {
    replace({
      pathname: '/login',
      query: { redirect: nextState.location.pathname },
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ MainLayout }>
        <Route component={ IndexApp }>
          <IndexRoute name="index" component={ Index } />
          <Route path="login" component={ Login } />
          <Route path="signup" component={ Signup } />
          <Route path="logout" component={ Logout } />
          <Route path="resetPassword" component={ ResetPassword } />
        </Route>

        <Route component={ PagesLayout }>
          {/* RENTAL PAGE */}
          <Route path="rental" component={ Rental } />
          <Route path="rental/query" component={ RentalBooking } />
          <Route path="rental/confirm" component={ RentalConfirm } />

          {/* TOUR RELATED PAGE */}
          <Route path="tour" component={ Tour } />
          <Route path="tour/query" component={ TourBooking } />
          <Route path="tour/confirm" component={ TourConfirm } />

          {/* ABOUT PAGE */}
          <Route path="about" component={ About } />

          {/* CONTACT PAGE */}
          <Route path="contact" component={ Contact } />
        </Route>

        <Route component={ BookingAccountLayout } onEnter={ requireAuth }>
          {/* LIMO BOOKING RELATED  */}
          <Route path="limo" component={ Limo } />
          <Route path="limo/query" component={ LimoBooking } />
          <Route path="limo/confirm" component={ LimoConfirm } />
          <Route path="limo/payment" component={ LimoPayment } />
          <Route path="limo/processPayment" component={ LimoPaymentProcessing } />
          <Route path="limo/summary" component={ LimoSummary } />

          {/* ACCOUNT RELATED */}
          <Route path="account" component={ Account } />
          <Route path="account/bookings" component={ BookingHistory } />
        </Route>
      </Route>

    </Router>,
    document.getElementById('react-root')
  );
});
