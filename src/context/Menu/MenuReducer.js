import { SET_ACTIVE_CTGS, SET_ACTIVE_PRICE_RANGES, SET_MENU } from './types';

const MenuReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MENU:
      return {
        ...state,
        menu: payload,
      };

    case SET_ACTIVE_CTGS:
      return {
        ...state,
        ctgs: payload,
      };

    case SET_ACTIVE_PRICE_RANGES:
      return {
        ...state,
        prices: payload,
      };

    default:
      return state;
  }
};

export default MenuReducer;
