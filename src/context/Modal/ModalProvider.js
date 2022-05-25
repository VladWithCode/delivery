import { useReducer } from 'react';
import ModalContext from './ModalContext';
import ModalReducer from './ModalReducer';
import { SET_MODAL_ACTIVE, SET_MODAL_INFO } from './types';

export const ModalProvider = ({ children }) => {
  const initialState = {
    isActive: false,
    info: {
      _id: null,
      title: '',
      description: '',
      price: 0,
      qty: 0,
      shouldUpdate: false,
    },
  };

  const [state, dispatch] = useReducer(ModalReducer, initialState);

  const setModalActive = isActive => {
    dispatch({ type: SET_MODAL_ACTIVE, payload: isActive });
  };

  const setModalInfo = info => {
    dispatch({
      type: SET_MODAL_INFO,
      payload: info,
    });
  };

  return (
    <ModalContext.Provider
      value={{
        isActive: state.isActive,
        info: state.info,
        setModalActive,
        setModalInfo,
      }}>
      {children}
    </ModalContext.Provider>
  );
};