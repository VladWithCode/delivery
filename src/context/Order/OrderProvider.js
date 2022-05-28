import React, { useReducer } from 'react';
import OrderContext from '../Order/OrderContext';
import OrderReducer from './OrderReducer';
import {
  SET_CHECKOUT_STEP,
  SET_CUSTOMER_INFO,
  SET_LAST_ORDER,
  SET_PAYMENT_INFO,
  SET_PAYMENT_METHOD,
  SET_STRIPE_CLIENT_SECRET,
  SET_STRIPE_INTENT_ID,
} from './types';

function OrderProvider({ children }) {
  const initialState = {
    customerInfo: {
      name: '',
      address: '',
      zip: '',
      phone: '',
    },
    paymentInfo: {
      method: 'cash',
      stripeIntentId: '',
      stripeClientSecret: '',
    },
    lastOrder: null,
    checkoutStep: 'CUSTOMER_INFO', // CUSTOMER_INFO | PAYMENT_METHOD_SELECTION | COMPLETE_PAYMENT | ORDER_DETAILS
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  const setCustomerInfo = info => {
    dispatch({ type: SET_CUSTOMER_INFO, payload: info });
  };

  const setPaymentInfo = info => {
    dispatch({ type: SET_PAYMENT_INFO, payload: info });
  };

  /**
   *
   * @param {'card' | 'cash'} method - The payment method choosed by the user
   */
  const setPaymentMethod = method => {
    dispatch({ type: SET_PAYMENT_METHOD, payload: method });
  };

  const setStripeIntentId = id => {
    dispatch({ type: SET_STRIPE_INTENT_ID, payload: id });
  };

  const setStripeClientSecret = secret => {
    dispatch({ type: SET_STRIPE_CLIENT_SECRET, payload: secret });
  };

  const setLastOrder = orderData => {
    dispatch({ type: SET_LAST_ORDER, payload: orderData });
  };

  /**
   *
   * @param {'CUSTOMER_INFO' | 'PAYMENT_METHOD_SELECTION' | 'COMPLETE_PAYMENT' | 'ORDER_DETAILS'} step -
   */
  const setCheckoutStep = step => {
    dispatch({ type: SET_CHECKOUT_STEP, payload: step });
  };

  return (
    <OrderContext.Provider
      value={{
        customerInfo: state.customerInfo,
        paymentInfo: state.paymentInfo,
        checkoutStep: state.checkoutStep,
        lastOrder: state.lastOrder,
        setCustomerInfo,
        setPaymentInfo,
        setCheckoutStep,
        setPaymentMethod,
        setStripeIntentId,
        setStripeClientSecret,
        setLastOrder,
      }}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;
