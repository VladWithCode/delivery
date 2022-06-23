import React from 'react';
import Order from './Order';
import OrderListing from './OrderListing';

function Orders() {
  return (
    <div className='dash-orders py-6'>
      <h1 className='fs-2 px-3 mb-2'>Ordenes</h1>
      <OrderListing
        title={'Ordenes Pendientes'}
        mappingFn={orders => orders.filter(o => !o.delivered)}
      />
      <OrderListing
        title={'Ordenes Finalizadas'}
        className='mt-2'
        mappingFn={orders => orders.filter(o => o.delivered)}
      />
    </div>
  );
}

export default Orders;
