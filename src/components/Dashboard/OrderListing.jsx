import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import DashboardContext from '../../context/Dashboard/DashboardContext';
import { useToast } from '../../hooks/useToast';
import SaleService from '../../services/SaleService';
import Order from './Order';

function OrderListing({ title, className = '', mappingFn }) {
  const { displayErrorToast, displaySuccessToast } = useToast();
  const { orders, setOrders, setCurrentOrder } = useContext(DashboardContext);
  const [mappedOrders, setMappedOrders] = useState(orders);

  const handleRefresh = async () => {
    const {
      sales: orders,
      toastMessage,
      failed,
    } = await SaleService.getSales();

    if (failed) return displayErrorToast(toastMessage);

    setOrders(orders);
    displaySuccessToast('Se actualizaron las ventas con exito');
  };

  const handleOrderSelect = id => {
    setCurrentOrder(id);
  };

  useEffect(() => {
    if (mappingFn) {
      setMappedOrders(mappingFn(orders, handleOrderSelect));
    } else {
      setMappedOrders(
        orders.map(o => (
          <Order
            id={o._id}
            order={o}
            handleOrderSelect={handleOrderSelect}
            key={o._id}
          />
        ))
      );
    }
  }, [orders, mappingFn]);

  return (
    <div className={'order-card '.concat(className).trim()}>
      <div className='order-card__header px-2 py-1'>
        <h5 className='h5'>{title || 'Ordenes'}</h5>
        <button
          className='btn btn--info btn--right btn--sm'
          onClick={handleRefresh}>
          Actualizar
        </button>
      </div>
      <div className='order-card__content px-2 py-1'>
        <div className='order-card__listing'>
          {mappedOrders.length > 0 ? (
            mappedOrders
          ) : (
            <p className='order-card__no-content my-1 fw-600'>
              No hay ordenes pendientes
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderListing;
