import React from 'react';
import { Link } from 'react-router'
import {
  Base,
  Button,
  PageHeader,
  Heading,
  Input,
  Textarea,
  Message,
  Space,
  Close,
  Text } from 'rebass';
import { Flex, Box } from 'reflexbox';
import { Loader } from './Loader';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';

export const SignupForm = (props) => {
  return (
    <div className="login-wrapper">
      <div className="login-background-image"></div>
      <Flex
        py={4}
        align="center"
        justify ="center"
        >
        <div className="login-inner animated bounceInDown">
        {props.accountCreated ?
          <Box p={3}
            >
            <Heading
              level={2}
              alt>
              Your account has been created. You need to first verify it by clicking the link that we sent in your given email before you can <Link to="/login">login</Link>.
            </Heading>
          </Box>
          :
          <Flex column>
          <Box p={3}>
            <div className="login-logo">
              <Heading
                level={1}
                mb={3}
                style={IndexLayout.caps}>
                DGD
              </Heading>
              <Heading
                level={2}
                alt>
                Sign Up for Free
              </Heading>
            </div>
          </Box>
          <div className="login-form">
            <Flex
              align='center'
              justify='center'>
              <Box p={3}
                sm={12}
                md={8}>
                {props.errorMessage ?
                  <Message
                    inverted
                    rounded
                    theme="error">
                    <div className="break-word">{props.errorMessage}</div>
                    <Space
                      auto
                      x={1}
                    />
                    <Close />
                  </Message>
                  : null
                }
                  <div className="signup-form">
                    <Input
                      name='username'
                      placeholder='Username'
                      type='text'
                      label=''
                      onChange={props.handleInput}
                      hideLabel />
                    <Input
                      name='email'
                      placeholder='Email'
                      type='email'
                      label=''
                      onChange={props.handleInput}
                      hideLabel />
                    <Input
                      name='password'
                      placeholder='Password'
                      type='password'
                      label=''
                      onChange={props.handleInput}
                      hideLabel />
                    {props.customerProfile ?
                    <Base
                      mt={4}>
                      <div className="details animated slideInUp">
                        <Heading
                          level={2}
                          alt>
                          Some small details to complete your profile
                        </Heading>
                        <div className="customer-details">
                          <Input
                            name='fullname'
                            placeholder='Full Name'
                            type='text'
                            label=''
                            onChange={props.handleInput}
                            hideLabel />
                          {/* <Input
                            name='address'
                            placeholder='Home Address'
                            type='text'
                            label=''
                            onChange={props.handleInput}
                            hideLabel /> */}
                          <Input
                            name='mobile_no'
                            placeholder='Mobile Phone No'
                            type='tel'
                            label=''
                            onChange={props.handleInput}
                            hideLabel />
                          <Input
                            name='home_no'
                            placeholder='Home Phone No'
                            type='tel'
                            label=''
                            onChange={props.handleInput}
                            hideLabel />
                        </div>
                      </div>
                    </Base> : null
                    }
                    {props.customerProfile ?
                      <Button
                        backgroundColor={props.loading ? '#d66a73' : CoreVariable.color}
                        color='white'
                        big
                        mt={4}
                        children={props.loading ? 'Creating Account...' : 'Sign Up'}
                        onClick={props.handleSignup} />
                      :
                      <Button
                        backgroundColor={CoreVariable.color}
                        color='white'
                        big
                        mt={4}
                        children='Next'
                        onClick={props.nextSignup} />
                    }
                  </div>
                </Box>
            </Flex>
          </div>
          </Flex>
        }
        </div>
      </Flex>
    </div>
  );
}
