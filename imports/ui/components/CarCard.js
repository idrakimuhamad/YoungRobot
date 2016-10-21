import React, { Component } from 'react';
import { Base, Box, Button, PageHeader, Heading, Text } from 'rebass';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';

export const CarCard = ({ car, index, userType }) => (
  <Box
    key={index}
    col={12}
    md={4}
    sm={6}
    p={2}>
    {/* <div className="limo-card">
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
              href={"/limo/query?vehicle=" + index}
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
    </div> */}
  </Box>
);
