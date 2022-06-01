import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../context/Cart/CartContext';
import OrderContext from '../../context/Order/OrderContext';
import ToastContext from '../../context/Toast/ToastContext';
import { priceToString } from '../../utils/helpers';

function Confirm() {
  const { displayErrorToast } = useContext(ToastContext);
  const { customerInfo, setCheckoutStep } = useContext(OrderContext);
  const { items, subtotal, tax, shipment, total } = useContext(CartContext);
  const [agreed, setAgreed] = useState(false);

  const handleContinueClick = () => {
    if (!agreed) {
      displayErrorToast(
        'Debes aceptar los terminos y condiciones y politica de privacidad'
      );
      return;
    }

    setCheckoutStep('PAYMENT_METHOD_SELECTION');
  };

  return (
    <div className='confirm my-1'>
      <div className='card card--dark'>
        <h3 className='card__title'>Datos del Cliente</h3>
        <div className='card__row'>
          <span className='card__concept'>Cliente</span>
          <span className='card__value'>{customerInfo.name}</span>
        </div>
        <div className='card__row'>
          <span className='card__concept'>Numero Telefonico</span>
          <span className='card__value'>{customerInfo.phone}</span>
        </div>
        <div className='card__row'>
          <span className='card__concept'>Domicilio de entrega</span>
          <span className='card__value'>{customerInfo.address}</span>
        </div>
        <h3 className='card__title mb-0'>Carrito</h3>
        <ul className='card__list'>
          {items?.map(i => {
            return (
              <li className='card__item' key={i.product}>
                <h4 className='title'>{i.name}</h4>
                <p className='times'>x{i.qty}</p>
                <div className='price'>${priceToString(i.total)}</div>
              </li>
            );
          })}
        </ul>
        <h3 className='card__title'>Totales</h3>
        <div className='card__row'>
          <span className='card__concept'>Subtotal</span>
          <span className='card__value'>${priceToString(subtotal)}</span>
        </div>
        <div className='card__row'>
          <span className='card__concept'>Envio</span>
          <span className='card__value'>${priceToString(shipment)}</span>
        </div>
        <div className='card__row'>
          <span className='card__concept'>Total</span>
          <span className='card__value'>${priceToString(total)}</span>
        </div>
        <div className='form__group form__group--check'>
          <div className='check-wrap'>
            <input
              type='checkbox'
              name='agree'
              className='form__check'
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />
          </div>
          <p className='form__paraph'>
            <label htmlFor='agree' className='form__label'>
              He leido y acepto los{' '}
            </label>
            <Link
              className='form__link'
              to='/terminos-y-condiciones'
              target='_blank'>
              Terminos y Condiciones
            </Link>{' '}
            y la{' '}
            <Link
              className='form__link'
              to='/politica de privacidad'
              target='_blank'>
              Politica de privacidad
            </Link>{' '}
            del sitio.
          </p>
        </div>
        <div className='card__row mt-2'>
          <button
            className='btn btn--danger btn--left'
            onClick={() => setCheckoutStep('CUSTOMER_INFO')}>
            Regresar
          </button>
          <button
            className='btn btn--submit btn--right'
            onClick={handleContinueClick}
            disabled={!agreed}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
