import React, { Component } from 'react';
import { Link } from 'react-router'
import { Base, Fixed, Heading, NavItem, ButtonOutline, Text } from 'rebass';
import { Flex } from 'reflexbox'
import { CoreVariable, IndexLayout, SideNav } from '../styles/IndexStyles';

export class NavigationSide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: props.toggleMenu
    };
  }

  render() {
    const navItem = [
      {
        to: '/limo',
        name: 'Limousine'
      }, {
        to: '/rental',
        name: 'Car Rental'
      }, {
        to: '/tour',
        name: 'Tour'
      }, {
        to: '/about',
        name: 'About'
      }, {
        to: '/contact',
        name: 'Contact'
      }, {
        to: '/login',
        name: 'Login'
      }
    ];

    return (
      <div className="side-menu">
        <Flex
          p={2}
          justify ="center"
          wrap
          column>
          <NavItem is="a"
            style={{...SideNav.logo, ...IndexLayout.caps, ...IndexLayout.block, ...IndexLayout.center}}>
            DGD
          </NavItem>
          {navItem.map((nav, i) => {
            let name = nav.name,
                to = nav.to;

            if (name === 'Login' && this.props.isLogin) {
              name = 'Account';
              to = '/account';
            }

            return (
              <NavItem
                key={i}
                to={to}
                is={Link}
                style={{...IndexLayout.caps, ...IndexLayout.block, ...IndexLayout.center}}
                mt={1}
                onClick={this.props.onNavigateAway}>
                {name}
              </NavItem>
            );
          })}
          {this.props.isLogin ?
            <NavItem
              to='/account/bookings'
              is={Link}
              style={{...IndexLayout.caps, ...IndexLayout.block, ...IndexLayout.center}}
              mt={1}
              onClick={this.props.onNavigateAway}>
              History
            </NavItem> :
            null
          }
          <ButtonOutline
            to={this.props.isLogin ? '/logout' : '/signup'}
            is={Link}
            onClick={this.props.onNavigateAway}
            style={{...IndexLayout.block, ...IndexLayout.center, ...IndexLayout.caps}}
            color={CoreVariable.color}
            mt={1}
            children={this.props.isLogin ? 'Logout' : 'Sign Up'}
            rounded />
        </Flex>
      </div>
    );
  }
}
