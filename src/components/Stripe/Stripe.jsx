import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLIC_KEY } from '../../config/globals';
import OrderContext from '../../context/Order/OrderContext';
import { Elements } from '@stripe/react-stripe-js';
import CardMethod from './CardMethod';
import WalletMethod from './WalletMethod';
import StripeService from '../../services/StripeService';
import CartContext from '../../context/Cart/CartContext';
import ToastContext from '../../context/Toast/ToastContext';
import asyncHandler from '../../utils/asyncHandler';

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

function Stripe() {
  const { displayErrorToast } = useContext(ToastContext);
  const cart = useContext(CartContext);
  const { paymentInfo, setStripeClientSecret } = useContext(OrderContext);
  const [secretLoaded, setSecretLoaded] = useState(false);

  const { stripeClientSecret } = paymentInfo;

  useEffect(() => {
    const createPaymentIntent = async () => {
      const [res, createIntentError] = await asyncHandler(
        StripeService.createPaymentIntent({ cart })
      );

      if (createIntentError) {
        res.error && console.error(res.error);
        displayErrorToast(res.message || createIntentError.message);
        return;
      }

      setStripeClientSecret(res.clientSecret);
      setSecretLoaded(true);
    };

    createPaymentIntent();
  }, []);

  return (
    <div className='stripe'>
      {secretLoaded ? (
        <Elements
          options={{ clientSecret: stripeClientSecret }}
          stripe={stripePromise}>
          <CardMethod />
          <WalletMethod />
        </Elements>
      ) : (
        'No Secret'
      )}
    </div>
  );
}

export default Stripe;
