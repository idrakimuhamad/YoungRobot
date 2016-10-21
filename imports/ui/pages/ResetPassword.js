import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { resetPassword } from '../../api/methods';
import { ResetPasswordForm } from '../components/ResetPasswordForm';

export class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: false,
      aboveTheFold: false,
      loading: false,
      passwordReset: false,
      email: '',
      username: '',
      error: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentWillUnmount() {
    this.setState({
      error: '',
      loading: false,
      passwordReset: false,
      username: '',
      email: ''
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
        email: event.target.value
      });
    }
  }

  handleReset() {
    const { username, email } = this.state;

    if (username && email) {
      this.setState({
        loading: true
      });

      resetPassword.call({
        username: username,
        email: email
      }, (err, res) => {
        if (err) {
          this.setState({
            error: err.reason,
            loading: false
          });
        } else {
          this.setState({
            error: '',
            passwordReset: true,
            loading: false
          });
        }
      });
    }
  }

  render() {
    const { username, password, error, loading, passwordReset } = this.state;
    return (
      <ResetPasswordForm
        error={error}
        loading={loading}
        username={username}
        password={password}
        passwordReset={passwordReset}
        handleInput={this.handleInput}
        handleReset={this.handleReset}
      />
    );
  }
}
