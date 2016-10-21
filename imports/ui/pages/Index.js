import React from 'react';
import { Link } from 'react-router'
import Slider from 'react-slick';
import { Base, Banner, Button, Heading, Section, Text } from 'rebass';
import { Flex, Box } from 'reflexbox'
import { CoreVariable, IndexPage } from '../styles/IndexStyles';

const settings = {
  className: 'index-slider',
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const bannerBg = {
  banner1 : {
    backgroundImage: 'url(/img/slide1.jpg)',
    width: '100vw'
  },
  banner2 : {
    backgroundImage: 'url(/img/slide2.jpg)',
    width: '100vw'
  },
  banner3 : {
    backgroundImage: 'url(/img/slide3.jpg)',
    width: '100vw'
  }
}

export const Index = () => (
  <div className="index-wrapper">
    <section className="index-parallax"
        style={IndexPage.bannerSection}>
      <Slider {...settings}>
        <div className="banner"
          style={bannerBg.banner1}>
          <Heading
            level={1}>
              Travel in style with chauffeur limousine
          </Heading>
          <Base
            mt={3}>
            <Button
              is={Link}
              to="limo"
              backgroundColor={CoreVariable.color}
              color="white"
              big
              rounded>
              Book Yours Now
            </Button>
          </Base>
        </div>
        <div className="banner"
          style={bannerBg.banner2}>
          <Heading
            level={1}>
              Free and easy, rent it and enjoy your drive
          </Heading>
          <Base
            mt={3}>
            <Button
              is={Link}
              to="rental"
              backgroundColor={CoreVariable.color}
              color="white"
              big
              rounded>
              Rent And Enjoy
            </Button>
          </Base>
        </div>
        <div className="banner"
          style={bannerBg.banner3}>
          <Heading
            level={1}>
              Enjoy fun and relaxing time with our tour packages
          </Heading>
          <Base
            mt={3}>
            <Button
              is={Link}
              to="tour"
              backgroundColor={CoreVariable.color}
              color="white"
              big
              rounded>
              Pick your tour
            </Button>
          </Base>
        </div>
      </Slider>
    </section>

    <section className="index-below-the-fold">
      <div className="intro-index">
        <Flex
          p={2}
          align="center"
          justify ="center"
          column>
          <Heading level={2}>
            METRO are an exclusive premier limousine company
          </Heading>
          <p className="intro-description">
            We provide limousine services to hotels, corporate clients and business and leisure travelers.
            Metro Limousine was established in 1996.
          </p>
        </Flex>
      </div>
      <div className="feature-index">
        <Section
          >
          <div className="index-section">
            <Flex
              align="center"
              wrap>
                <Box
                  col={12}
                  sm={6}
                  p={2}>
                  <div className="section-image" id="airportGreet"></div>
                </Box>
                <Box
                  col={12}
                  sm={6}
                  p={2}>
                  <Flex
                    align="center"
                    justify="center"
                    column>
                    <Heading
                      children="Airport Greetings"
                    />
                    <Text>We provide aiport greeting from KLIA and other airports.</Text>
                  </Flex>
                </Box>
              </Flex>
          </div>
        </Section>
        <Section>
          <div className="index-section">
            <Flex
              align="center"
              wrap>
                <Box
                  col={12}
                  sm={6}
                  p={2}>
                    <Flex
                      align="center"
                      justify="center"
                      column>
                      <Heading
                        children="In Car Options"
                      />
                      <Text>We provide car's selection with in-car accessories for your convenience.</Text>
                    </Flex>
                </Box>
                <Box
                  col={12}
                  sm={6}
                  p={2}>
                  <div className="section-image" id="carOptions"></div>
                </Box>
              </Flex>
          </div>
        </Section>
      </div>
    </section>
  </div>
);
