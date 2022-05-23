import { RESET_TOAST, SET_IS_VISIBLE, SET_MESSAGE, SET_TYPE } from './types';

const ToastReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_IS_VISIBLE:
      return {
        ...state,
        isVisible: payload,
      };

    case SET_MESSAGE:
      return {
        ...state,
        message: payload,
      };

    case SET_TYPE:
      return {
        ...state,
        type: payload,
      };

    case RESET_TOAST:
      return payload;

    default:
      return state;
  }
};

export default ToastReducer;
