import React, { useContext } from 'react';
import OrderContext from '../../context/Order/OrderContext';
import Stripe from '../Stripe/Stripe';

function CardPayment() {
  const {} = useContext(OrderContext);

  return (
    <div className='card-payment'>
      <Stripe />
    </div>
  );
}

export default CardPayment;
