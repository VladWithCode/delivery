import React, { useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLIC_KEY } from '../../config/globals';
import OrderContext from '../../context/Order/OrderContext';

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

function Stripe() {
  const {} = useContext(OrderContext);

  return <div>Stripe</div>;
}

export default Stripe;
