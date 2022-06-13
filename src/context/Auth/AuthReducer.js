import {
  SET_IS_ADMIN,
  SET_IS_AUTHENTICATED,
  SET_REDIRECT_TO,
  SET_USER,
} from './types';

const ToastReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_IS_ADMIN:
      return {
        ...state,
        isAdmin: payload,
      };

    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: payload,
      };

    case SET_USER:
      return {
        ...state,
        user: payload,
      };

    case SET_REDIRECT_TO:
      return {
        ...state,
        redirectTo: payload,
      };

    /* case SET_USER_CART:
      return {
        ...state,
        user
      }; */

    /* case SET_USER_DELIVERIES:
      return {
        ...state,
      }; */

    /* case SET_USER_NAME:
      return {
        ...state,

      };

    case SET_USER_ROLE:
      return {
        ...state,
      }; */

    default:
      return state;
  }
};

export default ToastReducer;
