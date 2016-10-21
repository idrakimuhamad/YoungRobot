import React, { Component } from 'react';
import { Base, Box, Button, PageHeader, Heading, Text } from 'rebass';
import { CarCard } from './CarCard';
import { CoreVariable, IndexLayout } from '../styles/IndexStyles';

export const CarList = ({ cars, userType }) => (
  cars.length > 0 ? <div className="cars">
    {cars.map((car, i) => (
      <CarCard
        key={i}
        car={car}
        index={i} />
    ))}
  </div> : <div className="nothing">Nothing</div>
);
