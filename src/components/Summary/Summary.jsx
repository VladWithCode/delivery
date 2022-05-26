import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../context/Cart/CartContext';
import { priceToString } from '../../utils/helpers';
import Listing from './Listing';

function Summary() {
  const { subtotal, items } = useContext(CartContext);
  const [isActive, setIsActive] = useState(false);

  const handleHeaderClick = () => {
    setIsActive(!isActive);
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
      </div>
      <Listing items={items} />
      <div className='summary__subtotal'>
        <span className='label'>Subtotal:</span>
        <span className='value'>${priceToString(subtotal)}</span>
      </div>
      <Link to='/checkout' className='summary__btn'>
        Realizar Pedido
      </Link>
    </div>
  );
}

export default Summary;
