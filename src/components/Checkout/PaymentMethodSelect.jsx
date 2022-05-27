import React, { useContext } from 'react';
import OrderContext from '../../context/Order/OrderContext';

function PaymentMethodSelect() {
  const { setCheckoutStep, setPaymentMethod } = useContext(OrderContext);

  const handleMethodSelect = e => {
    const { target } = e;

    setPaymentMethod(target.dataset.method);
    setCheckoutStep('COMPLETE_PAYMENT');
  };

  return (
    <div className='card-select'>
      <div
        className='card-select__card card'
        data-method='cash'
        onClick={handleMethodSelect}>
        <div className='card-select__img'>
          <svg className='card-select__icon'>
            <use href='/svg/sprites.svg#bill'></use>
          </svg>
        </div>
        <p className='card-select__title'>Efectivo</p>
      </div>
      <div
        className=' card-select__card card'
        data-method='card'
        onClick={handleMethodSelect}>
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
