import React, { Component } from 'react';
import { Link } from 'react-router'
import { Base, Fixed, Footer, Toolbar, NavItem, Space } from 'rebass';
import { IndexLayout } from '../styles/IndexStyles';

export class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let headerClass = this.props.aboveTheFold ? 'main-header header-bg' : 'main-header';
    let noBanner = !this.props.indexPage ? { background: '#fff' } : {};

    return (
      <Fixed
        top={true}
        right={true}
        left={true}
        style={{ width: 'calc(100% - 17px)' }}
        zIndex={3}>
        <div className={headerClass}
          style={noBanner}>
          <div className="inner-header">
            <Toolbar
              {...IndexLayout.headerStyles}
              color={this.props.aboveTheFold || this.props.isWhiteBg ? '#333' : '#fff'}>
              <NavItem
                to='/'
                is={Link}
                style={{...IndexLayout.caps}}>
                <span className="animated fadeInLeft">DGD</span>
              </NavItem>
              <Space x={2} />
              <NavItem
                is="a"
                onClick={this.props.onClick}
                style={IndexLayout.menuButton}>
                <span className="animated fadeInLeft"><i className="icon ion-grid"></i></span>
              </NavItem>
            </Toolbar>
          </div>
        </div>
      </Fixed>
    );
  }
}
