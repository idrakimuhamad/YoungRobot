import React from 'react';
import { Link } from 'react-router';
import {
  Base,
  Section,
  Button,
  PageHeader,
  Heading,
  Container,
  Space,
  Input,
  ButtonOutline } from 'rebass';
import { Flex, Box } from 'reflexbox';
import moment from 'moment';
import { Loader } from './Loader';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';

export const AccountProfile = (props) => (
  <div className="limo-wrapper">
    <Flex
      py={4}
      align="center"
      justify ="center"
      column>
      <Box
        col={12}>
        <div className="limo-inner">
        <Container>
          <PageHeader
            description="Details related to your account"
            heading="Your Profile"
            px={2}
            />
          {props.loading ?
            <Flex
              justify="center"
              align="center"
              column
              >
              <Loader />
              <Heading
                level={4}
                m={0}
                mt={1}
                style={IndexLayout.caps}
                children="Loading..." />
            </Flex> :
            <Flex wrap>
              <Box
                col={12}
                sm={12}
                p={2}>
                <div className="account-profile">
                  <Section
                    py={1}>
                    <div className="profile-table">
                      <div className="profile-details">
                        <Flex
                          wrap>
                          <Box
                            col={12}
                            sm={4}
                            p={2}>
                            <div className="account-item">
                              <span className="account-label">Username</span>
                              <span className="account-value">{props.userProfile.UserName}</span>
                            </div>
                          </Box>
                          <Box
                            col={12}
                            sm={4}
                            p={2}>
                            <div className="account-item">
                              <span className="account-label">Name</span>
                              {props.editState ?
                                <div>
                                  <Input
                                    label=""
                                    name="name"
                                    placeholder="Name"
                                    defaultValue={props.userProfile.CustomerName}
                                    onBlur={props.handleInput}
                                    rounded={false}
                                    type="text"
                                    />
                                    <Button
                                      backgroundColor={props.loadingUpdateInput ? '#d66a73' : CoreVariable.color}
                                      color='white'
                                      onClick={props.handleUpdateProfile}
                                      children={props.loadingUpdateInput ? 'Updating...' : 'Save'}
                                      big />
                                </div>
                                :
                                <span className="account-value">{props.userProfile.CustomerName}</span>
                              }
                              <a href="#" className={props.editState ? 'inline-edit customer-name-cancel' : 'inline-edit customer-name-edit'}
                                onClick={props.handleEditTransition}>{props.editState ? 'Cancel' : 'Edit'}</a>
                            </div>
                          </Box>
                          <Box
                            col={12}
                            sm={4}
                            p={2}>
                            <div className="account-item">
                              <span className="account-label">Email</span>
                              {props.editState ?
                                <div>
                                  <Input
                                    label=""
                                    name="email"
                                    placeholder="Email"
                                    defaultValue={props.userProfile.Email}
                                    onBlur={props.handleInput}
                                    rounded={false}
                                    type="text"
                                    />
                                    <Button
                                      backgroundColor={props.loadingUpdateInput ? '#d66a73' : CoreVariable.color}
                                      color='white'
                                      onClick={props.handleUpdateProfile}
                                      children={props.loadingUpdateInput ? 'Updating...' : 'Save'}
                                      />
                                    <Button
                                      theme="default"
                                      children="Cancel"
                                      />
                                </div>
                                :
                                <div>
                                  <span className="account-value">{props.userProfile.Email}</span>
                                  <a href="#" className='inline-edit'
                                    onClick={props.handleEditTransition}>Edit</a>
                                </div>
                              }
                            </div>
                          </Box>
                          {/* <Box
                            col={12}
                            sm={6}>
                            <div className="account-item">
                              <span className="account-label">Language</span>
                              <span className="account-value">{userProfile.LANGUAGE_CODE}</span>
                              <a href="#" className="inline-edit"
                                onClick={props.handleEditTransition}>Edit</a>
                            </div>
                          </Box> */}
                        </Flex>
                      </div>
                      <div className="profile-password">
                        <Heading
                          level={4}
                          px={1}
                          style={IndexLayout.caps}
                          children="Change password" />
                        {props.passwordError ?
                          <Heading
                            level={6}
                            px={1}
                            py={2}
                            color="error"
                            children={props.passwordError} /> : null
                        }
                        {props.passwordChangedSuccess ?
                          <Heading
                            level={6}
                            px={1}
                            py={2}
                            color="success"
                            children="Password updated successfully!" /> : null
                        }
                        <Flex
                          wrap>
                          <Box
                            col={12}
                            sm={6}
                            p={2}>
                            <Input
                              label=""
                              name="current_password"
                              placeholder="Current Password"
                              defaultValue={props.oldPassword}
                              onBlur={props.handleInput}
                              rounded={false}
                              type="password"
                              />
                          </Box>
                          <Box
                            col={12}
                            sm={6}
                            p={2}>
                            <Input
                              label=""
                              name="new_password"
                              placeholder="New Password"
                              defaultValue={props.newPassword}
                              onBlur={props.handleInput}
                              rounded={false}
                              type="password"
                              />
                          </Box>
                        </Flex>
                        <Button
                          mt={2}
                          backgroundColor={props.loadingPasswordChange ? '#d66a73' : CoreVariable.color}
                          color='white'
                          onClick={props.handleChangePassword}
                          children={props.loadingPasswordChange ? 'Updating...' : 'Change password'}
                          big />
                      </div>
                    </div>
                  </Section>
                </div>
              </Box>
            </Flex>
          }
          </Container>
        </div>
      </Box>
    </Flex>
  </div>
);
