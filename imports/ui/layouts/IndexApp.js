import React, { Component } from 'react';
import { Base } from 'rebass';
import { Header } from '../components/Header';
import { NavigationSide } from '../components/NavigationSide';
import { IndexLayout } from '../styles/IndexStyles';

export class IndexApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: false,
      aboveTheFold: false,
      isLogin: props.isLogin
    };
  }

  render() {
    const childrenProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
      setLogin: this.props.setLogin,
      handleLogout: this.props.handleLogout,
      loggingIn: this.props.loggingIn,
      loginError: this.props.loginError,
      signupPage: this.props.signupPage,
      isLogin: this.state.isLogin,
      token: this.props.token
    }));

    return (
      <div className="index-layout">
        <Header
        onClick={this.props.menuClick}
        aboveTheFold={this.props.aboveTheFold}
        indexPage/>
        { childrenProps }
      </div>
    );
  }
}
