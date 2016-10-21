import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { createUser, createProfile } from '../../api/methods';
import { SignupForm } from '../components/SignupForm';

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      customerProfileVisible: false,
      errorMessage: '',
      accountCreated: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  componentDidMount() {
    // invoke and set the state
    this.props.signupPage(true);
  }

  componentWillUnmount () {
    // invoke and set the state
    this.props.signupPage(false);
  }

  handleInput(event) {
    event = event.persist() || event;

    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleNext() {
    this.setState({
      customerProfileVisible: true
    });
  }

  handleSignup() {
    let {
      username,
      fullname,
      password,
      email,
      address,
      home_no,
      mobile_no
    } = this.state;

    this.setState({
      errorMessage: '',
      loading: true
    });

    // form the object for sign up
    // const customerBody = {
    //   parent_id: null,
    //   company_id: 1,
    //   city_id: 1,
    //   postal_city_id: 1,
    //   default_currency_code: "MYR",
    //   display_address: address
    // };

    const profileBody = {
      UserLoginName: username,
      UserPasswordHash: password,
      UserFullNAME: fullname,
      UserTelephone: home_no,
      UserEmailID: email,
      UserMOBILE: mobile_no,
      UserLANGUAGE_CODE: "en",
      UserTIME_ZONE_CODE: "MYT"
    };

    // Create customer profile
    createUser.call(profileBody, (err, res) => {
      if (!err) {
        if (res.statusCode === 201) {
          // user created, notify user to validate their email
          this.setState({
            accountCreated: true,
            loading: false
          });
        }
      } else {
        this.setState({
          errorMessage: err.reason,
          loading: false
        });
      }
    });
  }

  render() {
    const { loading, errorMessage, customerProfileVisible, accountCreated } = this.state;
    return (
      <SignupForm
        loading={loading}
        errorMessage={errorMessage}
        handleInput={this.handleInput}
        nextSignup={this.handleNext}
        handleSignup={this.handleSignup}
        customerProfile={customerProfileVisible}
        accountCreated={accountCreated} />
    );
  }
}
