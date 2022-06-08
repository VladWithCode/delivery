import React from 'react';
import Navigation from './Navigation';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__header'>
        <p className='footer__heading'>SU TACO</p>
      </div>
      <Navigation />
      <p className='footer__data'>
        Su Taco Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
        praesentium excepturi tempore totam id culpa sunt blanditiis fugiat
        repellendus. Sed officia nesciunt assumenda delectus quibusdam error
        facere sapiente dolorem doloremque.
      </p>
      <div className='footer__icons'>
        <svg className='footer__icon'>
          <use href='/svg/sprites.svg#cc-stripe'></use>
        </svg>
        <svg className='footer__icon'>
          <use href='/svg/sprites.svg#cc-mastercard'></use>
        </svg>
        <svg className='footer__icon'>
          <use href='/svg/sprites.svg#cc-visa'></use>
        </svg>
      </div>
      <p className='footer__copy fs-6 text-center'>
        Made by <strong>GG Marketing</strong> &trade;
      </p>
    </footer>
  );
}

export default Footer;
