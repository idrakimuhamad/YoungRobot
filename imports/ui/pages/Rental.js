import React from 'react';
import { Base, Button, PageHeader, Heading, Text } from 'rebass';
import { Flex, Box } from 'reflexbox';
// import { carList } from '../components/carList';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';

export const Rental = ({ vehicles, userType }) => (
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
            description="Select your choice of vehicle that suits your need"
            heading="Car Rental"
            px={2}
            />
            <Flex wrap>
              {vehicles.map((car, i) => (
                <Box
                  col={12}
                  md={4}
                  sm={6}
                  key={i}
                  p={2}>
                  <div className="limo-card">
                    <div className="limo-card-image"
                      style={{ backgroundImage: 'url(' + car.image + ')'}}>
                      <div className="limo-card-other">
                        <Heading
                          level={4}
                          m={0}
                          mb={1}
                          style={IndexLayout.caps} >
                          {car.name}
                        </Heading>
                        <Text>
                          {car.description}
                        </Text>
                        <div className="booking-button-container">
                          <Button
                            href={"/rental/query?vehicle=" + i}
                            backgroundColor={CoreVariable.color}
                            color='white'
                            big
                            children='Book' />
                        </div>
                      </div>
                      <div className="limo-card-title">
                        <Heading
                          level={4}
                          m={0}
                          style={IndexLayout.caps} >
                          {car.name}
                        </Heading>
                      </div>
                      <span className="start-price"
                        style={IndexLayout.caps}>
                        From RM{userType === 'regular' ? car.price.regular.klia.toAirport : (userType === 'agent' ? car.price.agent.klia.toAirport : car.price.corporate.klia.toAirport)}
                      </span>
                      <span className="specs">
                        <span className="passenger" title="Excluding Driver">
                          <i className="icon ion-person-stalker"></i>
                          <b>{car.passenger}</b>
                        </span>
                        <span className="luggage">
                          <i className="icon ion-briefcase"></i>
                          <b>{car.luggage}</b>
                        </span>
                      </span>
                    </div>
                  </div>
                </Box>
              ))}
            </Flex>
          </div>
        </Box>
      </Flex>
  </div>
);
