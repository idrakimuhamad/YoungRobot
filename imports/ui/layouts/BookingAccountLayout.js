import React, { Component } from 'react';
import { Base } from 'rebass';
import { Header } from '../components/Header';
import { NavigationSide } from '../components/NavigationSide';
import { Modal } from '../components/Modal';
import { IndexLayout } from '../styles/IndexStyles';

export class BookingAccountLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: false,
      aboveTheFold: false,
      isLogin: props.isLogin,
      userType: props.userType,
      modalOpen: false,
      modalTitle: '',
      modalBody: ''
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {

  }

  openModal({ title, body }) {
    this.setState({
      modalOpen: true,
      modalTitle: title,
      modalBody: body
    });
  }

  closeModal() {
    this.setState({
      modalOpen: false,
      modalTitle: '',
      modalBody: ''
    });
  }

  render() {
    const childrenProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
      isLogin: this.state.isLogin,
      token: this.props.token,
      aboveTheFold: this.props.aboveTheFold,
      // fixedPrice: this.props.fixedPrice,
      openModal: this.openModal
    }));

    return (
      <div className="pages-layout">
        <Header
        onClick={this.props.menuClick}
        aboveTheFold={this.props.aboveTheFold}
        isWhiteBg />
        { childrenProps }
        <Modal
          open={this.state.modalOpen}
          closeModal={this.closeModal}
          title={this.state.modalTitle}
          body={this.state.modalBody}
          />
      </div>
    );
  }
}
