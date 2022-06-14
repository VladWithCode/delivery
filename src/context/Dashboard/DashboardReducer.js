import { SET_CURRENT_ORDER, SET_ORDERS, UPDATE_ORDER } from './types';

const DashboardReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: payload,
      };

    case SET_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: payload,
      };

    case UPDATE_ORDER:
      const { id, order } = payload;
      const newOrders = [...state.orders];

      for (let o of newOrders) {
        if (order._id !== id) continue;

        o = order;
      }

      return {
        ...state,
        orders: newOrders,
      };

    default:
      return state;
  }
};

export default DashboardReducer;
