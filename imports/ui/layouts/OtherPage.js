import React, { Component } from 'react';
import { Base } from 'rebass';
import { Header } from '../components/Header';
import { NavigationSide } from '../components/NavigationSide';
import { Modal } from '../components/Modal';
import { IndexLayout } from '../styles/IndexStyles';

const limoList = [
  {
    name: 'Mercedes Benz S-Class',
    image: '/img/mercedes-s-class-thumb.jpg',
    description: 'Premium and luxurious journey for a grand experience.',
    price: {
      regular: {
        klia: {
          toAirport: 580,
          fromAirport: 580
        },
        subang: {
          toAirport: 450,
          fromAirport: 450
        },
        hourly: {
          withinKL: 180,
          outsideKL: 280
        },
        daily: {
          withinKL: 2000,
          outsideKL: 3000
        }
      },
      agent: {
        klia: {
          toAirport: 420,
          fromAirport: 420
        },
        subang: {
          toAirport: 300,
          fromAirport: 300
        },
        hourly: {
          withinKL: 180,
          outsideKL: 280
        },
        daily: {
          withinKL: 2000,
          outsideKL: 3000
        }
      },
      corporate: {
        klia: {
          toAirport: 560,
          fromAirport: 560
        },
        subang: {
          toAirport: 460,
          fromAirport: 460
        },
        hourly: {
          withinKL: 250,
          outsideKL: 350
        },
        daily: {
          withinKL: 2500,
          outsideKL: 3500
        }
      }
    },
    passenger: 3,
    luggage: 2
  }, {
    name: 'Mercedes Benz E Class',
    image: '/img/mercedes-e-class-thumb.jpg',
    description: 'Suitable for business executive to travel in style and comfortable to your destination safely.',
    price: {
      regular: {
        klia: {
          toAirport: 340,
          fromAirport: 340
        },
        subang: {
          toAirport: 250,
          fromAirport: 250
        },
        hourly: {
          withinKL: 160,
          outsideKL: 260
        },
        daily: {
          withinKL: 2000,
          outsideKL: 3000
        }
      },
      agent: {
        klia: {
          toAirport: 420,
          fromAirport: 420
        },
        subang: {
          toAirport: 250,
          fromAirport: 250
        },
        hourly: {
          withinKL: 180,
          outsideKL: 280
        },
        daily: {
          withinKL: 2000,
          outsideKL: 3000
        }
      },
      corporate: {
        klia: {
          toAirport: 360,
          fromAirport: 360
        },
        subang: {
          toAirport: 320,
          fromAirport: 320
        },
        hourly: {
          withinKL: 170,
          outsideKL: 270
        },
        daily: {
          withinKL: 1700,
          outsideKL: 2700
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
    name: 'Toyota Vellfire / Toyota Alphard',
    image: '/img/toyota-alphard-thumb.jpg',
    description: 'A luxurious MPV that can accommodate up to 7 passengers. Suitable for business executive and travelers.',
    price: {
      regular: {
        klia: {
          toAirport: 450,
          fromAirport: 450
        },
        subang: {
          toAirport: 400,
          fromAirport: 400
        },
        hourly: {
          withinKL: 180,
          outsideKL: 280
        },
        daily: {
          withinKL: 2000,
          outsideKL: 3000
        }
      },
      agent: {
        klia: {
          toAirport: 450,
          fromAirport: 450
        },
        subang: {
          toAirport: 400,
          fromAirport: 400
        },
        hourly: {
          withinKL: 180,
          outsideKL: 280
        },
        daily: {
          withinKL: 2000,
          outsideKL: 3000
        }
      },
      corporate: {
        klia: {
          toAirport: 450,
          fromAirport: 450
        },
        subang: {
          toAirport: 370,
          fromAirport: 370
        },
        hourly: {
          withinKL: 170,
          outsideKL: 180
        },
        daily: {
          withinKL: 1200,
          outsideKL: 1800
        }
      }
    },
    passenger: 6,
    luggage: 4
  }, {
    name: 'Hyundai Starex Royale MPV',
    image: '/img/hyundai-starex-thumb.jpg',
    description: 'Affordable mode of transport to travel around the city. Comfortable and spacious.',
    price: {
      regular: {
        klia: {
          toAirport: 310,
          fromAirport: 310
        },
        subang: {
          toAirport: 250,
          fromAirport: 250
        },
        hourly: {
          withinKL: 140,
          outsideKL: 240
        },
        daily: {
          withinKL: 2000,
          outsideKL: 3000
        }
      },
      agent: {
        klia: {
          toAirport: 310,
          fromAirport: 310
        },
        subang: {
          toAirport: 250,
          fromAirport: 250
        },
        hourly: {
          withinKL: 140,
          outsideKL: 240
        },
        daily: {
          withinKL: 2000,
          outsideKL: 3000
        }
      },
      corporate: {
        klia: {
          toAirport: 320,
          fromAirport: 320
        },
        subang: {
          toAirport: 250,
          fromAirport: 250
        },
        hourly: {
          withinKL: 145,
          outsideKL: 190
        },
        daily: {
          withinKL: 14500,
          outsideKL: 1900
        }
      }
    },
    passenger: 6,
    luggage: 4
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
  }, {
    name: 'Toyota Hiace High Top Van',
    image: '/img/high-top-van-thumb.jpg',
    description: 'Comfortable and spacious mode of transport to travel around the city or airports. Ideal for big luggage',
    price: {
      regular: {
        klia: {
          toAirport: 280,
          fromAirport: 280
        },
        subang: {
          toAirport: 180,
          fromAirport: 180
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
          toAirport: 280,
          fromAirport: 280
        },
        subang: {
          toAirport: 180,
          fromAirport: 180
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
          toAirport: 260,
          fromAirport: 260
        },
        subang: {
          toAirport: 200,
          fromAirport: 200
        },
        hourly: {
          withinKL: 120,
          outsideKL: 180
        },
        daily: {
          withinKL: 1200,
          outsideKL: 1800
        }
      }
    },
    passenger: 10,
    luggage: 4
  }, {
    name: 'Coach',
    image: '/img/executive-coach-thumb.jpg',
    description: 'With the ability to fit up to 40 passengers it is spacious and ideal for group, '
      + 'with DVD player and TV are equipped.',
    price: {
      regular: {
        klia: {
          toAirport: 750,
          fromAirport: 750
        },
        subang: {
          toAirport: 650,
          fromAirport: 650
        },
        hourly: {
          withinKL: 220,
          outsideKL: 400
        },
        daily: {
          withinKL: 2000,
          outsideKL: 3000
        }
      },
      agent: {
        klia: {
          toAirport: 750,
          fromAirport: 750
        },
        subang: {
          toAirport: 650,
          fromAirport: 650
        },
        hourly: {
          withinKL: 220,
          outsideKL: 400
        },
        daily: {
          withinKL: 2000,
          outsideKL: 3000
        }
      },
      corporate: {
        klia: {
          toAirport: 780,
          fromAirport: 780
        },
        subang: {
          toAirport: 680,
          fromAirport: 680
        },
        hourly: {
          withinKL: 230,
          outsideKL: 300
        },
        daily: {
          withinKL: 1800,
          outsideKL: 2500
        },
        dinner: {
          withinKL: 800,
          outsideKL: 950
        }
      }
    },
    passenger: 40,
    luggage: 35
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

export class OtherPage extends Component {
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
      limoList: limoList,
      locationsList: locationsList,
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
