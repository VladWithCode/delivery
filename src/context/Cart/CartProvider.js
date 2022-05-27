import { useReducer } from 'react';
import CartContext from './CartContext';
import CartReducer from './CartReducer';
import { SET_CART, SET_MINI_CART_ACTIVE } from './types';

export const CartProvider = ({ children }) => {
  const initialState = {
    miniCartActive: false,
    subtotal: 0,
    tax: 0,
    shipment: 0,
    total: 0,
    items: [],
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const setMiniCartActive = isMiniCartActive => {
    dispatch({ type: SET_MINI_CART_ACTIVE, payload: isMiniCartActive });
  };

  const setCart = cart => {
    dispatch({
      type: SET_CART,
      payload: { ...cart, miniCartActive: state.miniCartActive },
    });
  };

  const resetCart = () => {
    dispatch({
      type: SET_CART,
      payload: initialState,
    });
  };

  return (
    <CartContext.Provider
      value={{
        miniCartActive: state.miniCartActive,
        subtotal: state.subtotal,
        tax: state.tax,
        shipment: state.shipment,
        total: state.total,
        items: state.items,
        setMiniCartActive,
        setCart,
        resetCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};
