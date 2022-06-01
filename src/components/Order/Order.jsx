import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderContext from '../../context/Order/OrderContext';
import ToastContext from '../../context/Toast/ToastContext';
import { isEmptyObject, priceToString } from '../../utils/helpers';
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
        </div>
      ) : (
        <p className='fs-3 fw-600 text-center text-mute my-3'>
          No se encontro la orden solicitada
        </p>
      )}
    </div>
  );
}

export default Order;
