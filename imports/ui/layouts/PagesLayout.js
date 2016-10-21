import React, { Component } from 'react';
import { Base } from 'rebass';
import { Header } from '../components/Header';
import { NavigationSide } from '../components/NavigationSide';
import { Modal } from '../components/Modal';
import { IndexLayout } from '../styles/IndexStyles';

const carList = [
  {
    name: 'Toyota Vios',
    image: '/img/toyota-vios-thumb.jpg',
    description: 'Relaxing journey driven by our experience chauffeur to your destination. A good choice for affordability and comfort.',
    price: {
      regular: {
        klia: {
          toAirport: 240,
          fromAirport: 240
        },
        subang: {
          toAirport: 200,
          fromAirport: 200
        },
        hourly: {
          withinKL: 120,
          outsideKL: 220
        },
        daily: {
          withinKL: 2000,
          outsideKL: 3000
        }
      },
      agent: {
        klia: {
          toAirport: 240,
          fromAirport: 240
        },
        subang: {
          toAirport: 200,
          fromAirport: 200
        },
        hourly: {
          withinKL: 120,
          outsideKL: 220
        },
        daily: {
          withinKL: 2000,
          outsideKL: 3000
        }
      },
      corporate: {
        klia: {
          toAirport: 240,
          fromAirport: 240
        },
        subang: {
          toAirport: 180,
          fromAirport: 180
        },
        hourly: {
          withinKL: 105,
          outsideKL: 150
        },
        daily: {
          withinKL: 1050,
          outsideKL: 1500
        }
      }
    },
    passenger: 3,
    luggage: 2
  }, {
    name: 'Toyota Camry',
    image: '/img/toyota-camry-thumb.jpg',
    description: 'Relaxing journey driven by our experience chauffeur to your destination. A good choice for affordability and comfort.',
    price: {
      regular: {
        klia: {
          toAirport: 240,
          fromAirport: 240
        },
        subang: {
          toAirport: 200,
          fromAirport: 200
        },
        hourly: {
          withinKL: 120,
          outsideKL: 220
        },
        daily: {
          withinKL: 2000,
          outsideKL: 3000
        }
      },
      agent: {
        klia: {
          toAirport: 240,
          fromAirport: 240
        },
        subang: {
          toAirport: 200,
          fromAirport: 200
        },
        hourly: {
          withinKL: 120,
          outsideKL: 220
        },
        daily: {
          withinKL: 2000,
          outsideKL: 3000
        }
      },
      corporate: {
        klia: {
          toAirport: 240,
          fromAirport: 240
        },
        subang: {
          toAirport: 180,
          fromAirport: 180
        },
        hourly: {
          withinKL: 105,
          outsideKL: 150
        },
        daily: {
          withinKL: 1050,
          outsideKL: 1500
        }
      }
    },
    passenger: 3,
    luggage: 2
  }, {
    name: 'Toyota Innova',
    image: '/img/toyota-innova-thumb.jpg',
    description: 'A small MPV with space and can accommodate up to 5 passengers for an economic choice.',
    price: {
      regular: {
        klia: {
          toAirport: 175,
          fromAirport: 175
        },
        subang: {
          toAirport: 100,
          fromAirport: 100
        },
        hourly: {
          withinKL: 70,
          outsideKL: 140
        },
        daily: {
          withinKL: 2000,
          outsideKL: 3000
        }
      },
      agent: {
        klia: {
          toAirport: 175,
          fromAirport: 175
        },
        subang: {
          toAirport: 100,
          fromAirport: 100
        },
        hourly: {
          withinKL: 70,
          outsideKL: 140
        },
        daily: {
          withinKL: 2000,
          outsideKL: 3000
        }
      },
      corporate: {
        klia: {
          toAirport: 175,
          fromAirport: 175
        },
        subang: {
          toAirport: 135,
          fromAirport: 135
        },
        hourly: {
          withinKL: 70,
          outsideKL: 105
        },
        daily: {
          withinKL: 700,
          outsideKL: 1050
        }
      }
    },
    passenger: 5,
    luggage: 4
  }
];

const airportList = [
  {
    name: 'Kuala Lumpur International Airport',
    value: 'klia',
    type: 'airport'
  }, {
    name: 'Subang SkyPark Airport',
    value: 'skypark',
    type: 'airport'
  }
];

const placesList = [
  {
    name: 'Bangsar South',
    value: 'bangsarSouth',
    zip: '59200',
    type: 'place'
  }, {
    name: 'Cheras',
    value: 'cheras',
    zip: '56000',
    type: 'place'
  }, {
    name: 'Mid Valley City',
    value: 'mid',
    zip: '59200',
    type: 'place'
  }, {
    name: 'Subang Jaya',
    value: 'subangJaya',
    zip: '47500',
    type: 'place'
  }, {
    name: 'Bangsar',
    value: 'bangsar',
    zip: '59100',
    type: 'place'
  }
];

const locationsList = [
  {
    title: 'Airports',
    suggestions: airportList
  },
  {
    title: 'Cities',
    suggestions: placesList
  }
];

const tours = [
  {
    name: 'Kuala Lumpur Discovery Tour',
    image: '/img/kuala-lumpur-discovery.jpg',
    description: 'The capital city of Malaysia, embraces the old and modern surroundings. Visit the blend of colonial, oriental, westernized and modern buildings.',
    price: {
      adult: 90,
      child: 70
    },
    pickup: '0845hrs / 1330hrs (PJ) | 0915hrs / 1400hrs (KL)',
    places: 'KLCC, King Palace, National Museum, National Mosque, Batik Factory',
    itenary: '/img/kl-discovery.jpg',
    remark: null
  }, {
    name: 'Kuala Lumpur and Batu Caves Highlights Tour',
    image: '/img/kuala-lumpur-batu-caves.jpg',
    description: 'Visit the limestone hills of Batu Caves and the beauty of Kuala Lumpur in one sweep.',
    price: {
      adult: 128,
      child: 95
    },
    pickup: '0845hrs (PJ) | 0915hrs (KL)',
    places: 'Batu Caves & Hindu temples, National Palace, National Memorial, National Mosque, Twin Tower',
    itenary: '/img/batu-caves-and-kl-highlights.jpg',
    remark: null
  }, {
    name: 'Cultural Night Dinner Tour',
    image: '/img/cultural-night-dinner.jpg',
    description: 'Experience the nightlife in the "Garden City of Light" and enjoy a sumptuous Malay Buffet dinner with cultural dance',
    price: {
      adult: 225,
      child: 170
    },
    pickup: '1700 (PJ) | 1730 (KL)',
    places: null,
    itenary: '/img/cultural-night-dinner-itenary.jpg',
    remark: 'Tour inclusive of dinner & cultural show. Confirmation of tour depends on availability of seats at the restaurant. ' +
            'No short pants & slippers. Additional RM25 for adult and RM15 for child during fasting month (Ramadan month).' +
            'Full payment is required upon booking after seat availability is confirmed by tour manager.'
  }, {
    name: 'Batu Caves and Kuala Lumpur Night Out Tour',
    image: '/img/batu-caves-kl-night-out-town.jpg',
    description: 'Visit the Batu Caves (limestone Hindu temple) and Chinatown. Get the insight to some centuries-old colonial and oriental architectural structures.',
    price: {
      adult: 250,
      child: 200
    },
    pickup: '1515hrs',
    places: 'Batu Caves & Hindu Temples, Independence Square, Masjid Jamek & Concluence of 2 Rivers, Chinatown',
    itenary: '/img/batu-caves-kl-night-out-tour.jpg',
    remark: 'Tour price includes dinner at Non halal OLD CHINA CAFE ' +
            '(Traditional Baba Nyonya cuisine highly recommended by Lonely Planet) OR ' +
            'Halal scrumptious Malay dinner.'
  }, {
    name: 'Putrajaya Tour | Intelligent Garden City',
    image: '/img/putrajaya-town.jpg',
    description: 'Beautifully landscaped with green parks. Feel and view more than 170 crops such as cocoa, palm oil, rubber tree, fruits, herbs and spices',
    price: {
      adult: 195,
      child: 130
    },
    pickup: '0930hrs (KL) | 1000hrs (PJ)',
    places: null,
    itenary: '/img/putrajaya-tour.jpg',
    remark: 'Tour includes entrance fee for Agricultural Park, buggy ride & cruise.'
  }
];

export class PagesLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: false,
      aboveTheFold: false,
      isLogin: props.isLogin,
      userType: localStorage.getItem('userInfo'),
      modalOpen: false,
      modalTitle: '',
      modalBody: ''
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal({ title, body }) {
    this.setState({
      modalOpen: true,
      modalTitle: title,
      modalBody: body
    });
  }

  closeModal() {
    this.setState({
      modalOpen: false,
      modalTitle: '',
      modalBody: ''
    });
  }

  render() {
    const childrenProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
      userType: this.state.userType,
      vehicles: carList,
      locationsList: locationsList,
      tours: tours,
      aboveTheFold: this.props.aboveTheFold,
      fixedPrice: this.props.fixedPrice,
      openModal: this.openModal,
      token: this.props.token
    }));

    return (
      <div className="pages-layout">
        <Header
        onClick={this.props.menuClick}
        aboveTheFold={this.props.aboveTheFold}
        isWhiteBg />
        { childrenProps }
        <Modal
          open={this.state.modalOpen}
          closeModal={this.closeModal}
          title={this.state.modalTitle}
          body={this.state.modalBody}
          />
      </div>
    );
  }
}
