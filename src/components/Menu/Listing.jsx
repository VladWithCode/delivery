import React from 'react';
import Item from './Item';

function Listing() {
  return (
    <ul className='menu__listing'>
      <Item />
      <li className='menu__item card'>
        <img src='/img/pollo.png' alt='pollo' className='card__img' />
        <h4 className='card__title'>1 Pollo mediano</h4>
        <p className='card__description'>
          1 Pollo mediano asado más 5 tortillas y 250g de salsa
        </p>
        <p className='card__price'>$240.00</p>
      </li>
      <li className='menu__item card'>
        <img src='/img/pollo.png' alt='pollo' className='card__img' />
        <h4 className='card__title'>1 Pollo y &frac12; mediano</h4>
        <p className='card__description'>
          1 Pollo y &frac12; mediano asado más 8 tortillas y 250g de salsa
        </p>
        <p className='card__price'>$290.00</p>
      </li>
      <li className='menu__item card'>
        <img src='/img/pollo.png' alt='pollo' className='card__img' />
        <h4 className='card__title'>1 Pollo pequeño</h4>
        <p className='card__description'>
          1 Pollo pequeño asado más 5 tortillas
        </p>
        <p className='card__price'>$180.00</p>
      </li>
      <li className='menu__item card'>
        <img src='/img/pollo.png' alt='pollo' className='card__img' />
        <h4 className='card__title'>&frac12; Pollo mediano</h4>
        <p className='card__description'>
          &frac12; Pollo mediano asado más 5 tortillas
        </p>
        <p className='card__price'>$140.00</p>
      </li>
    </ul>
  );
}

export default Listing;
