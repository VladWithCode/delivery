import { SET_CART, SET_MINI_CART_ACTIVE } from './types';

const CartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MINI_CART_ACTIVE:
      return {
        ...state,
        miniCartActive: payload,
      };
    case SET_CART:
      return payload;

    default:
      return state;
  }
};

export default CartReducer;
