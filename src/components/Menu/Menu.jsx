import React from 'react';
import Listing from './Listing';

function Menu() {
  return (
    <div className='menu'>
      <h1 className='menu__title'>Pollos</h1>
      <h5 className='menu__subtitle'>¿Qué pollo se te antoja hoy?</h5>
      <Listing />
    </div>
  );
}

export default Menu;
