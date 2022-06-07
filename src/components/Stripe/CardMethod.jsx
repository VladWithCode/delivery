import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../context/Cart/CartContext';
import OrderContext from '../../context/Order/OrderContext';
import ToastContext from '../../context/Toast/ToastContext';
import CartService from '../../services/CartService';
import StripeService from '../../services/StripeService';

function CardMethod() {
  const { customerInfo, paymentInfo, setStripeIntentId, setCheckoutStep } =
    useContext(OrderContext);
  const { displaySuccessToast, displayErrorToast, displayInfoToast } =
    useContext(ToastContext);
  const { resetCart, subtotal, tax, shipment, items } = useContext(CartContext);
  const navigate = useNavigate();

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

    const { error } = await stripe.confirmPayment({
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

    const res = await StripeService.saveSaleToDB(stripeIntentId, {
      customer: customerInfo,
      cart: { shipment, tax, subtotal, items },
    });

    setLoading(false);

    if (res.status !== 'OK') {
      displayErrorToast(
        res.message ||
          'Ocurrio un error en el servidor. Su orden ha sido cancelada'
      );
      return;
    }

    const resetRes = await CartService.resetCart();

    if (resetRes.status !== 'OK')
      console.error(resetRes.error || resetRes.message);

    resetCart();
    displaySuccessToast('Pago exitoso. ¡Su orden esta en camino!');
    navigate('/orden/' + res.sale._id);
  };

  return (
    <form className='checkout__form card-method' onSubmit={handleSubmit}>
      <PaymentElement />
      <div className='card__row mt-2'>
        <button
          type='button'
          className='btn btn--danger btn--left'
          onClick={() => setCheckoutStep('PAYMENT_METHOD_SELECTION')}
          disabled={loading}>
          Regresar
        </button>
        <button
          type='submit'
          className={'btn btn--submit btn--right card-method__btn'.concat(
            loading ? ' loading' : ''
          )}
          disabled={disableButton}>
          <span className='btn-text'>Pagar</span>
          <span className='btn-spinner'></span>
        </button>
      </div>
    </form>
  );
}

export default CardMethod;
