import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Base, Banner, Heading } from 'rebass';
import { userLogout } from '../../api/methods';
import { Loader } from '../components/Loader';
import { IndexLayout } from '../styles/IndexStyles';

export class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: props.isLogin,
      token: props.token
    };
  }

  componentDidMount() {
    // logout the user
    userLogout.call(this.state.token, (err, res) => {
      if (err) {
        this.setState({
          loginError: err.reason
        });
      }

      // clear the user details from localstorage
      localStorage.removeItem('user_id');
      localStorage.removeItem('access_token');
      localStorage.removeItem('token_type');

      // dummy for now
      localStorage.removeItem('user_type');

      this.props.handleLogout();

      setTimeout(function() {
        browserHistory.push('/');
      }, 500);      
    });
  }

  render() {
    return (
      <Base>
        <Banner
          align="center"
          backgroundColor="white"
          mb={0}>
          <Loader />
          <Heading
            level={4}
            m={0}
            mt={1}
            style={IndexLayout.caps}
            children="Logging out..." />
        </Banner>
      </Base>
    );
  }
}
