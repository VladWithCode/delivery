import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderContext from '../../context/Order/OrderContext';
import ToastContext from '../../context/Toast/ToastContext';

function CustomerInfo() {
  const { displayErrorToast } = useContext(ToastContext);
  const { customerInfo, setCustomerInfo, setCheckoutStep } =
    useContext(OrderContext);
  const [agreed, setAgreed] = useState(false);
  const [displayInvalidFields, setDisplayInvalidFields] = useState(false);

  const { name, address, zip, phone } = customerInfo;

  const handleChange = e => {
    const { target } = e;

    setCustomerInfo({ ...customerInfo, [target.name]: target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!agreed) {
      displayErrorToast('Debes aceptar los terminos y condiciones');
      return;
    }

    setDisplayInvalidFields(true);

    if (!name || !address || !zip || !phone) {
      displayErrorToast('Todos los campos son obligatorios');
      return;
    }

    setCheckoutStep('PAYMENT_METHOD_SELECTION');
  };

  return (
    <form className='checkout__form form'>
      <div className='form__group'>
        <label htmlFor='name' className='form__label'>
          Nombre
        </label>
        <input
          className={'form__input'.concat(
            displayInvalidFields && !name ? ' invalid' : ''
          )}
          type='text'
          name='name'
          value={name}
          onChange={handleChange}
        />
      </div>
      <div className='form__group'>
        <label htmlFor='phone' className='form__label'>
          Número Telefónico
        </label>
        <input
          className={'form__input'.concat(
            displayInvalidFields && !phone ? ' invalid' : ''
          )}
          type='tel'
          name='phone'
          value={phone}
          onChange={handleChange}
        />
      </div>
      <div className='form__group'>
        <label htmlFor='address' className='form__label'>
          Domicilio
        </label>
        <input
          className={'form__input'.concat(
            displayInvalidFields && !address ? ' invalid' : ''
          )}
          type='text'
          name='address'
          value={address}
          onChange={handleChange}
        />
      </div>
      <div className='form__group'>
        <label htmlFor='zip' className='form__label'>
          Código Postal
        </label>
        <input
          className={'form__input'.concat(
            displayInvalidFields && !zip ? ' invalid' : ''
          )}
          type='text'
          name='zip'
          value={zip}
          onChange={handleChange}
        />
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
      <div className='form__group form__group--btns'>
        <button
          type='submit'
          className='form__btn form__btn--submit'
          onClick={handleSubmit}
          disabled={!agreed}>
          Continuar
        </button>
      </div>
    </form>
  );
}

export default CustomerInfo;
