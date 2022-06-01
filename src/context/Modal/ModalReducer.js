import { SET_MODAL_ACTIVE, SET_MODAL_INFO } from './types';

const ModalReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MODAL_ACTIVE:
      return {
        ...state,
        isActive: payload,
      };
    case SET_MODAL_INFO:
      return {
        ...state,
        info: payload,
      };

    default:
      return state;
  }
};

export default ModalReducer;
