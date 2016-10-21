import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { userLogin, userInfo } from '../../api/methods';
import { LoginForm } from '../components/LoginForm';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: false,
      aboveTheFold: false,
      loggingIn: false,
      email: '',
      password: '',
      loginError: '',
      isRedirect: props.location.query.redirect
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillUnmount() {
    this.setState({
      loginError: '',
      loggingIn: false,
      username: '',
      password: ''
    });
  }

  handleInput(event) {
    event = event.persist() || event;

    if (event.target.name === 'username') {
      this.setState({
        username: event.target.value
      });
    } else {
      this.setState({
        password: event.target.value
      });
    }
  }

  handleLogin() {
    const { username, password, isRedirect } = this.state;

    if (username && password) {
      this.setState({
        loggingIn: true
      });

      userLogin.call({
        username: username,
        password: password
      }, (err, res) => {
        if (err) {
          this.setState({
            loginError: err.reason,
            loggingIn: false
          });
        } else {
          // success
          console.log('Logged In: ' + res.data.user_id);

          // store the details in localStorage
          if (localStorage) {
            // save the rest in localstorage so we can use it on refresh
            localStorage.setItem('user_id', res.data.user_id);
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('token_type', res.data.token_type);

            // dummy for now
            localStorage.setItem('user_type', 'regular');
          }

          this.setState({
            loggingIn: false
          });

          this.props.setLogin(res.data.token_type + ' ' + res.data.access_token);

          // get the user info so we can get the user type (regular,corporate,agent etc)
          userInfo.call({}, (err, res) => {
            if (!err) {
              console.error('Error in retrieving the user info: ' + err);
            }
            /**
              * TODO
              * Put redirect and redirect based on the given url
              *
              * Redirect to LIMO page
              */
            if (isRedirect) {
              browserHistory.push('/' + isRedirect);
            } else {
              browserHistory.push('/account');
            }
          });
        }
      });
    }
  }

  render() {
    const { username, password, loginError, loggingIn } = this.state;
    return (
      <LoginForm
        error={loginError}
        loggingIn={loggingIn}
        username={username}
        password={password}
        handleInput={this.handleInput}
        handleLogin={this.handleLogin}
      />
    );
  }
}
