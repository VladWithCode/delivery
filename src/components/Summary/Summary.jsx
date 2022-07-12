import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../context/Cart/CartContext';
import ToastContext from '../../context/Toast/ToastContext';
import { priceToString } from '../../utils/helpers';
import Listing from './Listing';

function Summary() {
  const navigate = useNavigate();
  const { displayErrorToast } = useContext(ToastContext);
  const { subtotal, items } = useContext(CartContext);
  const [isActive, setIsActive] = useState(false);

  const handleHeaderClick = () => {
    setIsActive(!isActive);
  };

  const handleBtnClick = () => {
    if (items.length === 0) {
      displayErrorToast('Debes agregar articulos a tu carrito');
      return;
    }

    navigate('/checkout');
  };

  return (
    <div className={'summary'.concat(isActive ? ' active' : '')}>
      <div className='summary__header' onClick={handleHeaderClick}>
        <div className='summary__icon-wrap'>
          <svg className='summary__icon'>
            <use href='/svg/sprites.svg#cart'></use>
          </svg>
        </div>
        <h3 className='summary__title'>CARRITO</h3>
        <div className='summary__close'>&times;</div>
      </div>
      <Listing items={items} />
      <div className='summary__subtotal'>
        <span className='label'>Subtotal:</span>
        <span className='value'>${priceToString(subtotal)}</span>
      </div>
      <button
        className='summary__btn'
        onClick={handleBtnClick}
        disabled={items.length === 0}>
        Realizar Pedido
      </button>
    </div>
  );
}

export default Summary;
