import React from 'react';
import { priceToString } from '../../utils/helpers';

function Order({ id, order, handleOrderSelect }) {
  return (
    <div
      className='dash-card__item card card--dark card--noshadow mb-1'
      onClick={() => handleOrderSelect(id)}>
      <div className='card__row fs-4 mb-0 text-info'>
        <p className='name fw-500'>{order.customer.name}</p>
        <p className='content text-mute m-auto'>
          {order.items.reduce((p, c) => p + c.qty, 0)}
        </p>
        <p className='price fw-600'>${priceToString(order.payment.total)}</p>
      </div>
    </div>
  );
}

export default Order;
