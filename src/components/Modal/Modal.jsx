import React, { useContext } from 'react';
import ModalContext from '../../context/Modal/ModalContext';
import { priceToString } from '../../utils/helpers';

function Modal() {
  const { isActive, info, setModalActive } = useContext(ModalContext);

  const handleModalClose = () => setModalActive(false);

  return (
    <div className={'modal'.concat(isActive ? ' active' : '')}>
      <span className='modal__dropdown' onClick={handleModalClose}></span>
      <div className='modal__card card'>
        <span className='card__close' onClick={handleModalClose}>
          &times;
        </span>
        <img src='/img/pollo.png' alt='pollo' className='card__img m-0' />
        <h4 className='card__title fs-2 fw-500'>{info.title}</h4>
        <p className='card__description fs-1'>{info.description}</p>
        <p className='card__price fs-2'>${priceToString(info.price)}</p>
        <div className='card__controls mt-2'>
          <div className='card__qty'>
            <span className='minus'>-</span>
            <span className='display'>{info.qty}</span>
            <span className='plus'>+</span>
          </div>
          <button className='card__btn mr-0'>Añadir al Carrito</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
