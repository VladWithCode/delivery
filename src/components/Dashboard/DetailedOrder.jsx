import React from 'react';
import { useContext } from 'react';
import DashboardContext from '../../context/Dashboard/DashboardContext';
import { useToast } from '../../hooks/useToast';
import SaleService from '../../services/SaleService';
import {
  dateToReadableString,
  isEmptyObject,
  priceToString,
} from '../../utils/helpers';

function DetailedOrder({ active, setActive }) {
  const { displayErrorToast, displaySuccessToast } = useToast();
  const {
    currentOrder: order,
    setCurrentOrder,
    updateOrder,
  } = useContext(DashboardContext);

  const handleClose = () => {
    setActive(false);
    setCurrentOrder(null);
  };

  const handleMarkDelivered = async () => {
    const { sale, failed, toastMessage } = await SaleService.updateSale(
      order._id,
      { delivered: true }
    );

    if (failed) {
      displayErrorToast(toastMessage);
      return;
    }

    displaySuccessToast(toastMessage);
    updateOrder(sale._id, sale);
    setCurrentOrder(null, sale);
  };

  const handleMarkPaid = async () => {
    const { sale, failed, toastMessage } = await SaleService.updateSale(
      order._id,
      {
        'payment.isPayed': true,
      }
    );

    if (failed) {
      displayErrorToast(toastMessage);
      return;
    }

    displaySuccessToast(toastMessage);
    updateOrder(sale._id, sale);
    setCurrentOrder(null, sale);
  };

  return (
    <div className={'dash-detail'.concat(active ? ' active' : '')}>
      <div className='dash-detail__dropshadow' onClick={handleClose}></div>
      <div className='dash-detail__card card card--dark '>
        {isEmptyObject(order) ? (
          ''
        ) : (
          <>
            <span
              className='card__close my-auto'
              style={{ top: '1.8rem', right: '1.8rem' }}
              onClick={handleClose}>
              &times;
            </span>
            <h4 className='card__title'>Detalles</h4>
            <div className='card__row'>
              <div className='card__concept'>ID</div>
              <div className='card__value text-info'>{order._id}</div>
            </div>
            <div className='card__row'>
              <div className='card__concept'>Entregada</div>
              <div
                className={`card__value ${
                  order.delivered ? 'text-success' : 'text-warning'
                }`.trim()}>
                {order.delivered ? 'Sí' : 'No'}
              </div>
            </div>
            {!order.delivered ? (
              ''
            ) : (
              <div className='card__row'>
                <div className='card__concept'>Entregada el</div>
                <div
                  className='card__value'
                  style={{ textTransform: 'capitalize' }}>
                  {dateToReadableString(order.deliveredAt)}
                </div>
              </div>
            )}
            <div className='card__row'>
              <div className='card__concept'>Pagada</div>
              <div
                className={`card__value ${
                  order.payment.isPayed ? 'text-success' : 'text-warning'
                }`}>
                {order.payment.isPayed ? 'Sí' : 'No'}
              </div>
            </div>
            {!order.payment.isPayed ? (
              ''
            ) : (
              <div className='card__row'>
                <div className='card__concept'>Pagada el</div>
                <div
                  className='card__value'
                  style={{ textTransform: 'capitalize' }}>
                  {dateToReadableString(order.payment.payedOn)}
                </div>
              </div>
            )}
            <h4 className='card__title'>Datos del Cliente</h4>
            <div className='card__row mt-1'>
              <div className='card__concept'>Cliente</div>
              <div className='card__value'>{order.customer.name}</div>
            </div>
            <div className='card__row'>
              <div className='card__concept'>Telefono</div>
              <div className='card__value'>{order.customer.phone}</div>
            </div>
            <div className='card__row'>
              <div className='card__concept'>Domicilio</div>
              <div className='card__value'>{order.address}</div>
            </div>
            <div className='card__row'>
              <div className='card__concept'>Codigo Postal</div>
              <div className='card__value'>{order.zip}</div>
            </div>
            <h4 className='card__title'>Contenidos</h4>
            <ul className='card__list'>
              {order.items.map(i => (
                <li className='card__item py-1' key={i.sku}>
                  <div className='title'>{i.name}</div>
                  <div className='times'>x{i.qty}</div>
                  <div className='price'>${priceToString(i.total)}</div>
                </li>
              ))}
            </ul>
            <div className='card__row mt-1'>
              <span className='card__concept'>Subtotal</span>
              <span className='card__value text-success'>
                ${priceToString(order.payment.subtotal)}
              </span>
            </div>
            <div className='card__row'>
              <span className='card__concept'>I.V.A.</span>
              <span className='card__value text-success'>
                ${priceToString(order.payment.tax)}
              </span>
            </div>
            <div className='card__row'>
              <span className='card__concept'>Envio</span>
              <span className='card__value text-success'>
                ${priceToString(order.payment.shipment)}
              </span>
            </div>
            <hr />
            <div className='card__row mt-1'>
              <span className='card__concept'>Total</span>
              <span className='card__value text-success'>
                ${priceToString(order.payment.total)}
              </span>
            </div>
            <div className='card__row mt-2'>
              <button
                className='btn btn--danger btn--sm mx-1'
                disabled={order.delivered}>
                Cancelar Orden
              </button>
              <button
                className='btn btn--info btn--sm mx-1'
                disabled={order.delivered}
                onClick={handleMarkDelivered}>
                Marcar Entregada
              </button>
              <button
                className='btn btn--sm btn--submit mx-1'
                disabled={order.payment.isPayed}
                onClick={handleMarkPaid}>
                Marcar Pagada
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DetailedOrder;
