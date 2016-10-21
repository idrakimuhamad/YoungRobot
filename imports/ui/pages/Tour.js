import React from 'react';
import { Base, Button, PageHeader, Heading, Text } from 'rebass';
import { Flex, Box } from 'reflexbox';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';

export const Tour = ({ tours, userType }) => (
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
            description="Select your choice of tours"
            heading="Tour Packages"
            px={2}
            />
            <Flex wrap>
              {tours.map((tour, i) => (
                <Box
                  col={12}
                  md={4}
                  sm={6}
                  key={i}
                  p={2}>
                  <div className="limo-card">
                    <div className="limo-card-image"
                      style={{ backgroundImage: 'url(' + tour.image + ')'}}>
                      <div className="limo-card-other">
                        <Heading
                          level={4}
                          m={0}
                          mb={1}
                          style={IndexLayout.caps} >
                          {tour.name}
                        </Heading>
                        <Text>
                          {tour.description}
                        </Text>
                        <div className="booking-button-container">
                          <Button
                            href="/tour/query"
                            backgroundColor={CoreVariable.color}
                            color='white'
                            big
                            children='Book' />
                          {tour.itenary ?
                          <a
                            className="card-link"
                            href={tour.itenary}
                            target="_blank">View Itenary</a> : null}
                        </div>
                      </div>
                      <div className="limo-card-title">
                        <Heading
                          level={4}
                          m={0}
                          mb={1}
                          style={IndexLayout.caps} >
                          {tour.name}
                        </Heading>
                        <span className="tour-price"
                          style={IndexLayout.caps}>
                          <span>
                            Adult RM{tour.price.adult}
                          </span>
                          <span>
                            Child RM{tour.price.child}
                          </span>
                        </span>
                        <span className="tour-pickup" title="Pickup Time">
                          <i className="icon ion-clock"></i>
                          <b>{tour.pickup}</b>
                        </span>
                        {tour.places ?
                        <span className="pickup-location">
                          <i className="icon ion-location"></i>
                          <b>{tour.places}</b>
                        </span> : null
                        }
                      </div>
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
