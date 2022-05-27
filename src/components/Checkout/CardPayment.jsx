import React, { useContext } from 'react';
import OrderContext from '../../context/Order/OrderContext';

function CardPayment() {
  const {} = useContext(OrderContext);

  return <div className='card-payment'></div>;
}

export default CardPayment;
