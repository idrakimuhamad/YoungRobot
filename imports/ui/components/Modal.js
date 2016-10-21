import React, { Component } from 'react';
import {
  Overlay,
  Panel,
  PanelHeader,
  PanelFooter,
  Base,
  Button,
  Text,
  Close,
  Space } from 'rebass';
import { Flex, Box } from 'reflexbox';
import moment from 'moment';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';

export const Modal = ({ open, title, body, closeModal }) => (
  <Overlay
    open={open}
    onDismiss={closeModal}
    dark >
    <Panel theme="secondary">
      <PanelHeader
        inverted
        theme="default" >
        {title}
        <Space
          auto
          x={1} />
        <Close
          onClick={closeModal} />
      </PanelHeader>
      <Text>
        {body}
      </Text>
      <PanelFooter theme="default">
        <Space
          auto
          x={1} />
        <Button
          onClick={closeModal}
          backgroundColor={CoreVariable.color}
          color='white'
          children='Close' />
      </PanelFooter>
    </Panel>
  </Overlay>
);
