import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { userInfo, userUpdate, changePassword } from '../../api/methods';
import { AccountProfile } from '../components/AccountProfile'

export class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: props.token,
      userType: props.userType,
      loading: true,
      userProfile: {},
      oldPassword: null,
      newPassword: null,
      passwordChangedSuccess: false,
      loadingPasswordChange: false,
      loadingUpdateInput: false,
      inputUpdateSuccess: false,
      error: false,
      errorMessage: '',
      passwordError: null,
      editState: false
    };

    this.getProfile = this.getProfile.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleEditTransition = this.handleEditTransition.bind(this);
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile() {
    userInfo.call(this.state.token, (err, res) => {
      if (err) {
        console.log(err);
        this.setState({
          error: true,
          errorMessage: err.reason,
          loading: false
        });
      } else {
        const { data } = res;

        this.setState({
          userProfile: data,
          loading: false
        });
      }
    });
  }

  handleInput(event) {
    event = event.persist() || event;

    if (event.target.name == 'new_password') {
      this.setState({
        newPassword: event.target.value
      });
    } else if (event.target.name == 'name') {
      this.setState({
        fullname : event.target.value
      });
    } else if (event.target.name == 'email') {
      this.setState({
        email : event.target.value
      });
    } else {
      this.setState({
        oldPassword : event.target.value
      });
    }
  }

  handleChangePassword() {
    const { oldPassword, newPassword, token } = this.state;

    if (oldPassword && newPassword) {
      this.setState({
        loadingPasswordChange: true
      });

      changePassword.call({
        token: token,
        oldPassword: oldPassword,
        newPassword: newPassword
      }, (err, res) => {
        if (err) {
          console.log(err);
          this.setState({
            passwordError: err.reason,
            loadingPasswordChange: false
          });
        } else {
          this.setState({
            passwordChangedSuccess: true,
            loadingPasswordChange: false,
            oldPassword: '',
            newPassword: '',
            passwordError: null
          });
        }
      });
    }
  }

  handleEditTransition(event) {
    this.setState({
      editState: !this.state.editState
    });
  }

  handleUpdateProfile() {
    const { token, fullname, email } = this.state;
    const body = {
      CustomerName: fullname
    };

    // this.setState({
    //   loadingUpdateInput: !this.state.loadingUpdateInput
    // });

    // userUpdate.call({
    //   token: token,
    //   body: body
    // }, (err, res) => {
    //   if (err) {
    //     console.log(err);
    //     this.setState({
    //       inputError: err.reason,
    //       loadingUpdateInput: false,
    //       inputUpdateSuccess:false
    //     });
    //   } else {
    //     this.setState({
    //       inputError: false,
    //       inputUpdateSuccess: true,
    //       loadingUpdateInput: false
    //     });
    //   }
    // })
  }

  render() {
    const {
      loading,
      userProfile,
      oldPassword,
      newPassword,
      passwordChangedSuccess,
      error,
      errorMessage,
      passwordError,
      loadingPasswordChange,
      loadingUpdateInput,
      editState,
      inputError,
      inputUpdateSuccess } = this.state;
    return (
      <AccountProfile
        loading={loading}
        error={error}
        errorMessage={errorMessage}
        passwordError={passwordError}
        userProfile={userProfile}
        oldPassword={oldPassword}
        newPassword={newPassword}
        passwordChangedSuccess={passwordChangedSuccess}
        loadingPasswordChange={loadingPasswordChange}
        loadingUpdateInput={loadingUpdateInput}
        editState={editState}
        inputError={inputError}
        inputUpdateSuccess={inputUpdateSuccess}
        handleInput={this.handleInput}
        handleChangePassword={this.handleChangePassword}
        handleEditTransition={this.handleEditTransition} />
    );
  }
}
