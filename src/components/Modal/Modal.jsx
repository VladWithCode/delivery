import React, { useContext } from 'react';
import { SERVER_URL } from '../../config/globals';
import CartContext from '../../context/Cart/CartContext';
import ModalContext from '../../context/Modal/ModalContext';
import ToastContext from '../../context/Toast/ToastContext';
import CartService from '../../services/CartService';
import { priceToString } from '../../utils/helpers';

function Modal() {
  const { isActive, info, setModalActive, setModalInfo, resetModalInfo } =
    useContext(ModalContext);
  const { setCart } = useContext(CartContext);
  const { displayErrorToast, displaySuccessToast } = useContext(ToastContext);

  const handleModalClose = () => {
    setModalActive(false);
    resetModalInfo();
  };

  const handleMinusClick = () => {
    const newQty = info.qty - 1 >= 0 ? info.qty - 1 : 0;

    setModalInfo({ ...info, qty: newQty });
  };

  const handlePlusClick = () => {
    const newQty = info.qty + 1;

    setModalInfo({ ...info, qty: newQty });
  };

  const handleAddToCartClick = async () => {
    try {
      const cart = await CartService.addToCart(info, info.qty);

      setCart(cart);
      displaySuccessToast('Se agrego el producto al carrito');
      setModalActive(false);
      resetModalInfo();
    } catch (err) {
      console.log(err);
      displayErrorToast(err.message);
    }
  };

  return (
    <div className={'modal'.concat(isActive ? ' active' : '')}>
      <span className='modal__dropdown' onClick={handleModalClose}></span>
      <div className='modal__card card card--dark'>
        <span className='card__close' onClick={handleModalClose}>
          &times;
        </span>
        <img
          src={SERVER_URL.concat(info.img)}
          alt='pollo'
          className='card__img m-0'
        />
        <h4 className='card__title fs-2 fw-500'>{info.name}</h4>
        <p className='card__concept'>{info.description}</p>
        <div className='card__row mt-1'>
          <div className='card__value fs-3'>${priceToString(info.price)}</div>
        </div>
        <div className='card__controls mt-1'>
          <div className='card__qty'>
            <span className='minus' onClick={handleMinusClick}>
              -
            </span>
            <span className='display'>{info.qty}</span>
            <span className='plus' onClick={handlePlusClick}>
              +
            </span>
          </div>
          <button
            className='btn btn--info btn--right'
            onClick={handleAddToCartClick}>
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
