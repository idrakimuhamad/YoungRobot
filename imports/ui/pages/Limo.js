import React, { Component } from 'react';
import { vehicleList, getVcode } from '../../api/methods';
import { LimoList } from '../components/LimoList';

export class Limo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: props.isLogin,
      token: props.token,
      userType: props.userType,
      loadingList: false,
      limoList: [],
      error: false
    };
  }

  componentDidMount() {
    let _this = this;

    if (this.state.isLogin) {
      this.setState({
        loadingList: true
      });

      vehicleList.call({ type: 'limo', token: this.state.token }, (err, res) => {
        if (err) {
          console.error(err);
          this.setState({
            error: true,
            errorMessage: err.reason,
            loadingList: false
          });
        } else {
          _this.setState({
            limoList: res.data,
            loadingList: false
          });
        }
      });
    }
  }

  render() {
    return (
      <LimoList
        error={this.state.error}
        errorMessage={this.state.errorMessage}
        limoList={this.state.limoList}
        userType={this.state.userType}
        loadingList={this.state.loadingList}
      />
    );
  }
}
