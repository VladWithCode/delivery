import React, { useContext, useEffect, useState } from 'react';
import { SERVER_URL } from '../../config/globals';
import CartContext from '../../context/Cart/CartContext';
import ToastContext from '../../context/Toast/ToastContext';
import CartService from '../../services/CartService';

function Item({ item }) {
  const { displayErrorToast, displaySuccessToast } = useContext(ToastContext);
  const { setCart } = useContext(CartContext);
  const [qty, setQty] = useState(item.qty);

  useEffect(() => {
    setQty(item.qty);
  }, [item.qty]);

  const handleRemoveClick = async () => {
    try {
      const cart = await CartService.removeFromCart(item.product);

      setCart(cart);
      displaySuccessToast('Se elimino del carrito');
    } catch (err) {
      console.log(err);
      displayErrorToast(err.message);
    }
  };

  const handleQtyChange = async () => {
    try {
      const cart = await CartService.updateItemQty(item.product, qty);

      setCart(cart);
    } catch (err) {
      console.log(err);
      displayErrorToast(err.message);
    }
  };

  return (
    <div className='summary__item'>
      <img
        src={SERVER_URL.concat(item.img)}
        alt={item.name}
        className='summary__img'
      />
      <h5 className='summary__name'>{item.name}</h5>
      <div className='summary__control'>
        <input
          type='number'
          className='summary__qty'
          value={qty}
          onChange={e => setQty(e.target.value)}
        />
        <button className='summary__submit' onClick={handleQtyChange}>
          <svg className='icon'>
            <use href='/svg/sprites.svg#check'></use>
          </svg>
        </button>
      </div>
      <div className='summary__remove' onClick={handleRemoveClick}>
        <svg className='icon'>
          <use href='/svg/sprites.svg#bin'></use>
        </svg>
      </div>
    </div>
  );
}

export default Item;
