import React, { useReducer } from 'react';
import ToastContext from '../Toast/ToastContext';
import OrderReducer from './OrderReducer';
import { SET_CUSTOMER_INFO, SET_PAYMENT_INFO } from './types';

function OrderProvider({ children }) {
  const initialState = {
    customerInfo: {
      name: '',
      address: '',
      zip: '',
      phone: '',
    },
    paymentInfo: {},
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  const setCustomerInfo = info => {
    dispatch({ type: SET_CUSTOMER_INFO, payload: info });
  };

  const setPaymentInfo = info => {
    dispatch({ type: SET_PAYMENT_INFO, payload: info });
  };

  return (
    <ToastContext.Provider
      value={{
        customerInfo: state.customerInfo,
        paymentInfo: state.paymentInfo,
        setCustomerInfo,
        setPaymentInfo,
      }}>
      {children}
    </ToastContext.Provider>
  );
}

export default OrderProvider;
