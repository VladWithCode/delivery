import React, { useContext, useEffect, useState } from 'react';
import OrderContext from '../../context/Order/OrderContext';
import CardPayment from './CardPayment';
import CustomerInfo from './CustomerInfo';
import PaymentMethodSelect from './PaymentMethodSelect';

function Checkout() {
  const { checkoutStep } = useContext(OrderContext);
  const [stepTitle, setStepTitle] = useState('');
  const [stepSubtitle, setStepSubtitle] = useState('');
  const [stepElement, setStepElement] = useState(null);

  useEffect(() => {
    switch (checkoutStep) {
      case 'PAYMENT_METHOD_SELECTION': // 2
        setStepTitle('Metodo de pago');
        setStepSubtitle('Seleccione un metodo de pago');
        setStepElement(<PaymentMethodSelect />);
        break;
      case 'CARD_PAYMENT': // 3
        setStepTitle('Pago con tarjeta');
        setStepSubtitle('Ingrese los datos de su tarjeta de credito/debito');
        setStepElement(<CardPayment />);
        break;
      case 'CONFIRM_ORDER': // 4
        break;
      case 'POST_PAYMENT': // 5
        break;
      case 'CUSTOMER_INFO': // 1
      default:
        setStepTitle('Datos Generales');
        setStepSubtitle('Ingrese su información y datos de entrega');
        setStepElement(<CustomerInfo />);
    }
  }, [checkoutStep]);

  return (
    <div className='checkout container'>
      <h1 className='checkout__title heading'>{stepTitle}</h1>
      {stepSubtitle && (
        <h5 className='checkout__subtitle subtitle'>{stepSubtitle}</h5>
      )}
      {stepElement}
    </div>
  );
}

export default Checkout;
