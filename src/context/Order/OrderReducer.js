import {
  SET_CHECKOUT_STEP,
  SET_CUSTOMER_INFO,
  SET_PAYMENT_INFO,
  SET_PAYMENT_METHOD,
  SET_STRIPE_CLIENT_SECRET,
  SET_STRIPE_INTENT_ID,
} from './types';

const OrderReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CUSTOMER_INFO:
      return { ...state, customerInfo: payload };

    case SET_PAYMENT_INFO:
      return { ...state, paymentInfo: payload };

    case SET_CHECKOUT_STEP:
      return { ...state, checkoutStep: payload };

    case SET_PAYMENT_METHOD:
      return {
        ...state,
        paymentInfo: { ...state.paymentInfo, method: payload },
      };
    case SET_STRIPE_CLIENT_SECRET:
      return {
        ...state,
        paymentInfo: { ...state.paymentInfo, stripeClientSecret: payload },
      };

    case SET_STRIPE_INTENT_ID:
      return {
        ...state,
        paymentInfo: { ...state.paymentInfo, stripeIntentId: payload },
      };

    default:
      return state;
  }
};

export default OrderReducer;
