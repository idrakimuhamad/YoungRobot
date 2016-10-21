import React from 'react';
import { Base, Button, PageHeader, Heading, Text } from 'rebass';
import { Flex, Box } from 'reflexbox';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';

export const Contact = ({limoList, userType}) => (
  <div className="limo-wrapper">
    <Flex
      py={4}
      align="center"
      justify ="center"
      column>
        <Box
          col={12}>
          <div className="limo-inner">
          <PageHeader
            description="Contact us page"
            heading="Contact Us"
            px={2}
            />
            <Flex wrap>
              
            </Flex>
          </div>
        </Box>
      </Flex>
  </div>
);
