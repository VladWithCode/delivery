import React, { useContext } from 'react';
import OrderContext from '../../context/Order/OrderContext';

function PaymentMethodSelect() {
  const { setCheckoutStep, setPaymentMethod } = useContext(OrderContext);

  const handleMethodSelect = methodType => {
    switch (methodType) {
      case 'card':
        setPaymentMethod(methodType);
        setCheckoutStep('CARD_PAYMENT');
        break;
      case 'cash':
        console.log('TODO: Implement Cash payments');
        break;
      default:
        return;
    }
  };

  return (
    <div className='card-select'>
      <div
        className='card-select__card card'
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
    </div>
  );
}

export default PaymentMethodSelect;
