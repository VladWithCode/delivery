import React, { useContext } from 'react';
import ModalContext from '../../context/Modal/ModalContext';

function Item() {
  const { setModalActive } = useContext(ModalContext);

  return (
    <li className='menu__item card' onClick={() => setModalActive(true)}>
      <img src='/img/pollo.png' alt='pollo' className='card__img' />
      <h4 className='card__title'>1 Pollo Grande</h4>
      <p className='card__description'>
        1 Pollo grande asado más 8 tortillas y 250g de salsa
      </p>
      <p className='card__price'>$360.00</p>
    </li>
  );
}

export default Item;
