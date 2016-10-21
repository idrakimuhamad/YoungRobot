import React from 'react';
import { Link } from 'react-router';
import { Base, Button, PageHeader, Heading, Text, Message, Close, Space } from 'rebass';
import { Flex, Box } from 'reflexbox';
import { Loader } from './Loader';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';
import { publicEndpoint } from '../../api/endpoints';

export const LimoList = ({limoList, userType, loadingList, error, errorMessage}) => (
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

            heading="Limousine & Fleet"
            px={2}
            />
            {error ?
              <Flex
                justify="center"
                align="center"
                column
                >
                <Message
                  inverted
                  rounded
                  theme="error" >
                  {errorMessage.length ?
                      errorMessage :
                      <Text>Opps.. There seems to be a problem in retrieving the data from the server. Check your connection or email our support.</Text>
                     }
                  <Space
                    auto
                    x={1}
                  />
                  <Close />
                </Message>
              </Flex> : null}
              {loadingList ?
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
                  {limoList.map((limo, i) => {
                    const imgUrl = limo.image_uploaded ? publicEndpoint + '/syntronic-api-v1/catalogs/Limo/products/' + limo.id + '/image' : 'https://placehold.it/450x450';
                    return (
                    <Box
                      col={12}
                      md={4}
                      sm={6}
                      key={limo.id}
                      p={2}>
                      <div className="limo-card">
                        <div className="limo-card-image"
                          style={{ backgroundImage: 'url(' + imgUrl + ')'}}>
                          <div className="limo-card-other">
                            <Heading
                              level={4}
                              m={0}
                              mb={1}
                              style={IndexLayout.caps} >
                              {limo.name}
                            </Heading>
                            <Text>
                              {limo.description}
                            </Text>
                            <div className="booking-button-container">
                              <Button
                                to={"/limo/query?vehicle=" + limo.id}
                                is={Link}
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
                              {limo.name}
                            </Heading>
                          </div>
                          <span className="start-price"
                            style={IndexLayout.caps}>
                            {/* From RM{userType === 'regular' ? limo.price.regular.klia.toAirport : (userType === 'agent' ? limo.price.agent.klia.toAirport : limo.price.corporate.klia.toAirport)} */}
                          </span>
                          <span className="specs">
                            <span className="passenger" title="Excluding Driver">
                              <i className="icon ion-person-stalker"></i>
                              <b>{limo.passenger}</b>
                            </span>
                            <span className="luggage">
                              <i className="icon ion-briefcase"></i>
                              <b>{limo.luggage}</b>
                            </span>
                          </span>
                        </div>
                      </div>
                    </Box>
                  )
                  })}
                </Flex>
              }
          </div>
        </Box>
      </Flex>
  </div>
);
