import { useEffect, useReducer } from 'react';
import { useToast } from '../../hooks/useToast';
import SaleService from '../../services/SaleService';
import DashboardContext from './DashboardContext';
import DashboardReducer from './DashboardReducer';
import { SET_ACTIVE_CTGS, SET_ACTIVE_PRICE_RANGES, SET_MENU } from './types';

export const DashboardProvider = ({ children }) => {
  const { displayErrorToast, displaySuccessToast } = useToast();
  const initialState = {
    orders: [],
    currentOrder: {},
  };

  const [state, dispatch] = useReducer(DashboardReducer, initialState);

  const setOrders = orders => {};

  useEffect(() => {
    const getOrders = async () => {
      const res = await SaleService.getSales();

      if (res.failed) {
        displayErrorToast(res.toastMessage);
      }
    };
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        orders: state.orders,
        currentOrder: state.currentOrder,
      }}>
      {children}
    </DashboardContext.Provider>
  );
};
