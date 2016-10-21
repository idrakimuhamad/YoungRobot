import React from 'react';
import { Link } from 'react-router';
import { Base, Button, Heading, Input, Message, Space, Close } from 'rebass';
import { Flex, Box } from 'reflexbox';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';

export const LoginForm = ({error, loggingIn, username, password, handleLogin, handleInput }) => (
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
              DGD
            </Heading>
            <Heading
              level={2}
              alt>
              Login into Your Account
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
              <Input
                name='username'
                placeholder='Username'
                type='text'
                label=''
                onChange={handleInput}
                hideLabel />
              <Input
                name='password'
                placeholder='Password'
                type='password'
                label=''
                onChange={handleInput}
                hideLabel />
              <Button
                backgroundColor={loggingIn ? '#d66a73' : CoreVariable.color}
                color='white'
                big
                mt={4}
                children={loggingIn ? 'Logging In...' : 'Login'}
                onClick={handleLogin} />
              <Box
                p={2}
                col={12}>
                <Link
                  to="/resetPassword"
                  className="links">I forgot my password</Link>
              </Box>
            </Box>
          </Flex>
        </div>
      </div>
    </Flex>
  </div>
);
