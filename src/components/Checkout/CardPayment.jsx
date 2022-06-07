import React, { useContext } from 'react';
import OrderContext from '../../context/Order/OrderContext';
import Stripe from '../Stripe/Stripe';

function CardPayment() {
  return (
    <div className='card-payment'>
      <Stripe />
    </div>
  );
}

export default CardPayment;
