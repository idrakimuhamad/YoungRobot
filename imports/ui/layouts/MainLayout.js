import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Base } from 'rebass';
import { userLogin, userLogout, userInfo } from '../../api/methods';
import { Header } from '../components/Header';
import { NavigationSide } from '../components/NavigationSide';
import { IndexLayout } from '../styles/IndexStyles';

export class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: false,
      aboveTheFold: false,
      isSignup: false,
      isLogin: localStorage && !!localStorage.getItem('user_type'),
      token: localStorage && localStorage.getItem('token_type') && localStorage.getItem('access_token') ?
            localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token') : null
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleSideNavigation = this.handleSideNavigation.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.signupPage = this.signupPage.bind(this);
    this.setLogin = this.setLogin.bind(this);
  }

  componentWillUpdate() {
    // console.log(this.props);
  }

  handleOpenMenu(expand) {
    this.setState({
      toggleMenu: expand
    });
  }

  handleCloseMenu() {
    let menuOpen = this.state.toggleMenu;
    let innerContent = this.refs.innerContent;
    if (menuOpen) {
      this.setState({
        toggleMenu: false,
        aboveTheFold: false
      });

      // setTimeout(function() {
      //   innerContent.scrollTop = innerContent.scrollTop + 1;
      // }, 700);
    }
  }

  handleSideNavigation() {
    this.refs.innerContent.scrollTop = 0;
    this.handleCloseMenu();
  }

  signupPage(set) {
    this.setState({
      isSignup: set
    });
  }

  setLogin(token) {
    this.setState({
      isLogin: true,
      token: token
    });
  }

  handleScroll() {
    // the element with scrolling is the inner-content
    let scrollTop = this.refs.innerContent.scrollTop,
        className = this.refs.innerContent.className,
        isSignup = this.state.isSignup;

    if (!isSignup && scrollTop > 200 && className.indexOf('shadow') == -1) {
      this.setState({
        aboveTheFold: true
      });
    } else if (!isSignup && scrollTop < 199 && className.indexOf('shadow') > -1){
      this.setState({
        aboveTheFold: false
      });
    }

    // if (scrollTop > 150 && scrollTop < 600) {
    //   this.setState({
    //     fixedPrice: false,
    //     aboveTheFold: true
    //   });
    // } else if (scrollTop > 600) {
    //   this.setState({
    //     fixedPrice: true,
    //     aboveTheFold: true
    //   });
    // } else {
    //   this.setState({
    //     fixedPrice: false,
    //     aboveTheFold: false
    //   });
    // }
  }

  handleLogout() {
    this.setState({
      isLogin: false
    });
  }

  render() {
    let menuClick = () => this.handleOpenMenu(true);
    let wrapperClass = this.state.toggleMenu ? 'content-wrapper menu-open' : 'content-wrapper';
    let innerClass = this.state.aboveTheFold ? 'shadow inner-content' : 'inner-content';
    // let wrapperClass = this.state.toggleMenu ? 'content-wrapper menu-open' : 'content-wrapper';
    const childrenProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
      menuClick: menuClick,
      aboveTheFold: this.state.aboveTheFold,
      isLogin: this.state.isLogin,
      token: this.state.token,
      setLogin: this.setLogin,
      userType: this.state.userType,
      signupPage: this.signupPage,
      // fixedPrice: this.state.fixedPrice,
      handleLogout: this.handleLogout
    }));

    return (
      <div className={wrapperClass}>
        <div className="app-wrapper"
            onClick={this.handleCloseMenu.bind(this)}>
          <div className={innerClass}
            onScroll={this.handleScroll}
            ref="innerContent">
            {childrenProps}
          </div>
        </div>
        <NavigationSide
          isLogin={this.state.isLogin}
          logout={this.handleLogout}
          onNavigateAway={this.handleSideNavigation} />
      </div>
    );
  }
}
