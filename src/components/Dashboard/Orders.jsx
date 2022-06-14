import React from 'react';

function Orders() {
  return (
    <div className='dash-orders mt-5'>
      <div className='dash-orders__header px-2 py-1'>
        <h5 className='h5'>Ordenes</h5>
        <button className='btn btn--info btn--right btn--sm'>Actualizar</button>
      </div>
      <div className='dash-orders__content px-2 py-1'>
        <div className='dash-orders__listing'>
          {/* <p className='dash-orders__no-content m-auto'>
          No hay ordenes pendientes
        </p> */}
          <div className='dash-orders__item card card--dark card--noshadow mb-1'>
            <div className='card__row fs-4 mb-0'>
              <p className='name fw-500'>Jairo Rangel</p>
              <p className='content text-mute m-auto'>6 productos</p>
              <p className='price fw-600'>$1,500</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
