import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import OrderContext from '../../context/Order/OrderContext';
import ToastContext from '../../context/Toast/ToastContext';
import {
  dateToReadableString,
  isEmptyObject,
  priceToString,
} from '../../utils/helpers';
import makeServerRequest from '../../utils/makeServerRequest';

function Order() {
  const { id } = useParams();
  const { lastOrder } = useContext(OrderContext);
  const { displayErrorToast } = useContext(ToastContext);
  const [order, setOrder] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (id || lastOrder?._id) {
      const getOrder = async () => {
        const res = await makeServerRequest(
          `/public/sales/${id || lastOrder?._id}`
        );
        setInitialized(true);

        if (res.status !== 'OK') {
          displayErrorToast(
            res.message ||
              res.error?.message ||
              'Ocurrio un error al recuperar la orden'
          );
          return;
        }

        setOrder(res.sale);
      };

      getOrder();
    }
  }, []);

  return (
    <div className='container'>
      <h1 className='heading'>Detalles de su orden</h1>
      <p className='subtitle'>
        Gracias por su compra. Su pedido llegara pronto a su casa :)
      </p>
      <p className='text-warning fs-4 mb-2'>
        Si hay algun error con la informacion en pantalla, puede contactarnos al
        Tel. 618-100-2233.
      </p>
      {!initialized ? (
        <div className='spinner my-5'></div>
      ) : !isEmptyObject(order) ? (
        <div className='card card--dark'>
          <h4 className='card__title'>Datos del cliente</h4>
          <div className='card__row my-1'>
            <span className='card__concept'>Cliente</span>
            <span className='card__value'>{order.customer.name}</span>
          </div>
          <div className='card__row my-1'>
            <span className='card__concept'>Numero Telefonico</span>
            <span className='card__value'>{order.customer.phone}</span>
          </div>
          <div className='card__row my-1'>
            <span className='card__concept'>Domicilio</span>
            <span className='card__value'>{order.address}</span>
          </div>
          <div className='card__row my-1'>
            <span className='card__concept'>Codigo Postal</span>
            <span className='card__value'>{order.zip}</span>
          </div>
          <h4 className='card__title'>Datos de la orden</h4>
          <div className='card__row my-1'>
            <span className='card__concept'>ID</span>
            <div className='card__value'>{order._id}</div>
          </div>
          <div className='card__row my-1'>
            <span className='card__concept'>Pagada</span>
            <span className='card__value'>
              {order.payment.isPayed ? 'Si' : 'No'}
            </span>
          </div>
          {order.payment.payedAt ? (
            <div className='card__row my-1'>
              <span className='card__concept'>Pagada el</span>
              <span className='card__value'>
                {dateToReadableString(order.payedAt)}
              </span>
            </div>
          ) : (
            ''
          )}
          <h4 className='card__title'>Articulos</h4>
          <ul className='card__list'>
            {order.items?.map(i => (
              <li className='card__item' key={i.product}>
                <div className='title'>{i.name}</div>
                <div className='times'>x{i.qty}</div>
                <div className='card__price'>${priceToString(i.total)}</div>
              </li>
            ))}
          </ul>
          <div className='card__row mt-2 mb-1'>
            <span className='card__concept'>Subtotal</span>
            <span className='card__value text-success'>
              ${priceToString(order.payment.subtotal)}
            </span>
          </div>
          <div className='card__row my-1'>
            <span className='card__concept'>I.V.A.</span>
            <span className='card__value text-success'>
              ${priceToString(order.payment.tax)}
            </span>
          </div>
          <div className='card__row my-1'>
            <span className='card__concept'>Envio</span>
            <span className='card__value text-success'>
              ${priceToString(order.payment.shipment)}
            </span>
          </div>
          <hr />
          <div className='card__row my-1'>
            <span className='card__concept'>Total</span>
            <span className='card__value text-success'>
              ${priceToString(order.payment.total)}
            </span>
          </div>
        </div>
      ) : (
        <p className='fs-3 fw-600 text-center text-mute my-3'>
          No se encontro la orden solicitada
        </p>
      )}
      <Link className='fs-3 fw-bold text-info ml-auto my-1' to='/'>
        &laquo; Volver al inicio
      </Link>
    </div>
  );
}

export default Order;
