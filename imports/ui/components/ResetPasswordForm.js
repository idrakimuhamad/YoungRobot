import React from 'react';
import { Link } from 'react-router';
import { Base, Button, Heading, Input, Message, Space, Close } from 'rebass';
import { Flex, Box } from 'reflexbox';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';

export const ResetPasswordForm = ({error, loading, username, password, passwordReset, handleReset, handleInput }) => (
  <div className="login-wrapper">
    <div className="login-background-image"></div>
    <Flex
      py={4}
      align="center"
      justify ="center"
      wrap
      column>
      <div className="login-inner animated bounceInDown">
        <Box p={3}>
          <div className="login-logo">
            <Heading
              level={1}
              mb={3}
              style={IndexLayout.caps}>
              SYNTRONIC
            </Heading>
            <Heading
              level={2}
              alt>
              {passwordReset ?
                <span>An email with instruction has been sent to your email. Please follow the steps to complete the process, and <Link to="/login">Login again.</Link></span>
                :
                <span>Reset your password by giving us your username and email registered under the account</span>
              }
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
              {error ?
                <Message
                  inverted
                  rounded
                  theme="error">
                  <div className="break-word">{error}</div>
                  <Space
                    auto
                    x={1}
                  />
                  <Close />
                </Message>
                : null
              }
              {!passwordReset ?
                <div>
                  <Input
                    name='username'
                    placeholder='Username'
                    type='text'
                    label=''
                    onChange={handleInput}
                    hideLabel />
                  <Input
                    name='email'
                    placeholder='Email'
                    type='email'
                    label=''
                    onChange={handleInput}
                    hideLabel />
                  <Button
                    backgroundColor={loading ? '#d66a73' : CoreVariable.color}
                    color='white'
                    big
                    mt={4}
                    children={loading ? 'Updating...' : 'Reset Password'}
                    onClick={handleReset} />
                </div>
                  :
                  null
              }

            </Box>
          </Flex>
        </div>
      </div>
    </Flex>
  </div>
);
