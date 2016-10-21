import React, { Component } from 'react';

export const Loader = ({ small }) => {
  const className = small ? 'loader small' : 'loader';
  return (
    <div className={className}></div>
  );
}
