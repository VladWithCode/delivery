import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import OrderContext from '../../context/Order/OrderContext';
import ToastContext from '../../context/Toast/ToastContext';

function CardMethod() {
  const { paymentInfo, setStripeIntentId, setStripeClientSecret } =
    useContext(OrderContext);
  const { displaySuccessToast, displayErrorToast, displayInfoToast } =
    useContext(ToastContext);

  const stripe = useStripe();
  const elements = useElements();

  const [firstLoad, setFirstLoad] = useState(true);
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const { stripeIntentId, stripeClientSecret } = paymentInfo;

  useEffect(() => {
    if (!stripe) return;

    stripe
      .retrievePaymentIntent(stripeClientSecret)
      .then(({ paymentIntent }) => {
        setStripeIntentId(paymentIntent.id);
        setDisableButton(false);

        if (firstLoad) {
          setFirstLoad(false);
          return;
        }

        setLoading(true);

        switch (paymentIntent.status) {
          case 'succeeded':
            displaySuccessToast('Pago exitoso');
            break;
          case 'processing':
            displayInfoToast(
              'El pago esta siendo procesado. Espera un momento.'
            );
            break;
          case 'requires_payment_method':
            displayErrorToast(
              'Tu pago no se ha completado. Intenta de nuevo o con una tarjeta diferente'
            );
            break;
          default:
            displayErrorToast('Ha ocurrido un error');
        }
      });
  }, [stripe]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements || disableButton) return;

    setLoading(true);
    setDisableButton(true);

    const {} = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      setDisableButton(false);
      setLoading(false);

      switch (error.type) {
        case 'card_error':
        case 'validation_error':
          displayErrorToast(error.message);
        default:
          displayErrorToast('Ocurrio un error inesperado');
      }

      return;
    }
  };

  return (
    <form className='card-method' onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type='submit'
        className='btn btn--submit card-method__btn'
        disabled={disableButton}>
        <span className='btn-text'>Pagar</span>
        <span className='btn-spinner'></span>
      </button>
    </form>
  );
}

export default CardMethod;
