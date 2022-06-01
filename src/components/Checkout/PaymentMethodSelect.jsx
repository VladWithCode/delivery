import React, { useContext } from 'react';
import OrderContext from '../../context/Order/OrderContext';

function PaymentMethodSelect() {
  const { setCheckoutStep, setPaymentMethod } = useContext(OrderContext);

  const handleMethodSelect = methodType => {
    setPaymentMethod(methodType);
    switch (methodType) {
      case 'card':
        setCheckoutStep('CARD_PAYMENT');
        break;
      case 'cash':
        setCheckoutStep('CASH_PAYMENT');
        break;
      default:
        return;
    }
  };

  return (
    <div className='card-select'>
      <div
        className='card-select__card card card--dark'
        onClick={() => handleMethodSelect('cash')}>
        <div className='card-select__img'>
          <svg className='card-select__icon'>
            <use href='/svg/sprites.svg#bill'></use>
          </svg>
        </div>
        <p className='card-select__title'>Efectivo</p>
      </div>
      <div
        className=' card-select__card card'
        onClick={() => handleMethodSelect('card')}>
        <div className='card-select__img'>
          <svg className='card-select__icon'>
            <use href='/svg/sprites.svg#credit_card'></use>
          </svg>
        </div>
        <p className='card-select__title'>Tarjeta de Credito/Debito</p>
      </div>
      <div className='card__row'>
        <button
          className='btn btn--danger btn--left'
          onClick={() => setCheckoutStep('CONFIRM_ORDER')}>
          Regresar
        </button>
      </div>
    </div>
  );
}

export default PaymentMethodSelect;
