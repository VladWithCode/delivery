import { useEffect, useReducer } from 'react';
import { useToast } from '../../hooks/useToast';
import SaleService from '../../services/SaleService';
import DashboardContext from './DashboardContext';
import DashboardReducer from './DashboardReducer';
import { SET_CURRENT_ORDER, SET_ORDERS, UPDATE_ORDER } from './types';

export const DashboardProvider = ({ children }) => {
  const { displayErrorToast } = useToast();
  const initialState = {
    orders: [],
    currentOrder: null,
  };

  const [state, dispatch] = useReducer(DashboardReducer, initialState);

  const setOrders = orders => {
    dispatch({ type: SET_ORDERS, payload: orders });
  };

  const setCurrentOrder = (id, forceOrder = null) => {
    const order = forceOrder
      ? forceOrder
      : state.orders.find(o => o._id === id);

    dispatch({ type: SET_CURRENT_ORDER, payload: order });
  };

  const updateOrder = (id, order) => {
    dispatch({ type: UPDATE_ORDER, payload: { id, order } });
  };

  useEffect(() => {
    const getOrders = async () => {
      const res = await SaleService.getSales();

      if (res.failed) {
        displayErrorToast(res.toastMessage);
      }

      setOrders(res.sales);
    };

    getOrders();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        orders: state.orders,
        currentOrder: state.currentOrder,
        setOrders,
        setCurrentOrder,
        updateOrder,
      }}>
      {children}
    </DashboardContext.Provider>
  );
};
