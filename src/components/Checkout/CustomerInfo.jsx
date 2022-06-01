import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderContext from '../../context/Order/OrderContext';
import ToastContext from '../../context/Toast/ToastContext';

function CustomerInfo() {
  const navigate = useNavigate();
  const { displayErrorToast } = useContext(ToastContext);
  const { customerInfo, setCustomerInfo, setCheckoutStep } =
    useContext(OrderContext);
  const [displayInvalidFields, setDisplayInvalidFields] = useState(false);

  const { name, address, zip, phone } = customerInfo;

  const handleChange = e => {
    const { target } = e;

    setCustomerInfo({ ...customerInfo, [target.name]: target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setDisplayInvalidFields(true);

    if (!name || !address || !zip || !phone) {
      displayErrorToast('Todos los campos son obligatorios');
      return;
    }

    setCheckoutStep('CONFIRM_ORDER');
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
      <div className='form__group form__group--btns'>
        <button
          type='button'
          className='btn btn--danger btn--left'
          onClick={() => navigate('/')}>
          Regresar
        </button>
        <button
          type='submit'
          className='btn btn--submit btn--right'
          onClick={handleSubmit}>
          Continuar
        </button>
      </div>
    </form>
  );
}

export default CustomerInfo;
