import React, { useContext } from 'react';
import OrderContext from '../../context/Order/OrderContext';

function CustomerInfo() {
  const { customerInfo, setCustomerInfo, setCheckoutStep } =
    useContext(OrderContext);

  const { name, address, zip, phone } = customerInfo;

  const handleChange = e => {
    const { target } = e;

    setCustomerInfo({ ...customerInfo, [target.name]: target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setCheckoutStep('PAYMENT_METHOD_SELECTION');
  };

  return (
    <form className='checkout__form form'>
      <div className='form__group'>
        <label htmlFor='name' className='form__label'>
          Nombre
        </label>
        <input
          className='form__input'
          type='text'
          name='name'
          value={name}
          onChange={handleChange}
        />
      </div>
      <div className='form__group'>
        <label htmlFor='address' className='form__label'>
          Domicilio
        </label>
        <input
          className='form__input'
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
          className='form__input'
          type='text'
          name='zip'
          value={zip}
          onChange={handleChange}
        />
      </div>
      <div className='form__group'>
        <label htmlFor='phone' className='form__label'>
          Número Telefónico
        </label>
        <input
          className='form__input'
          type='tel'
          name='phone'
          value={phone}
          onChange={handleChange}
        />
      </div>
      <div className='form__group form__group--btns'>
        <button
          type='submit'
          className='form__btn form__btn--submit'
          onClick={handleSubmit}>
          Continuar
        </button>
      </div>
    </form>
  );
}

export default CustomerInfo;
