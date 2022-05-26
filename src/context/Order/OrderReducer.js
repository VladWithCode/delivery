import { SET_CUSTOMER_INFO, SET_PAYMENT_INFO } from './types';

const OrderReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CUSTOMER_INFO:
      return { ...state, customerInfo: payload };

    case SET_PAYMENT_INFO:
      return { ...state, paymentInfo: payload };

    default:
      return state;
  }
};

export default OrderReducer;
