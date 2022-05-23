import { useReducer } from 'react';
import ToastContext from './ToastContext';
import ToastReducer from './ToastReducer';
import { RESET_TOAST, SET_IS_VISIBLE, SET_MESSAGE, SET_TYPE } from './types';

export const ToastProvider = ({ children }) => {
  const initialState = {
    isVisible: false,
    message: '',
    type: 'info', // 'info' | 'error' | 'warning' | 'success'
  };

  const [state, dispatch] = useReducer(ToastReducer, initialState);

  const setIsVisible = (isVisible, autoHide) => {
    dispatch({ type: SET_IS_VISIBLE, payload: isVisible });

    if (!!isVisible && autoHide) {
      setTimeout(() => setIsVisible(false), 3000);
    }
  };

  /**
   * Set the toast type
   * @param {'info' | 'error' | 'warning' | 'success'} type
   */
  const setType = type => {
    dispatch({ type: SET_TYPE, payload: type });
  };

  const setMessage = msg => {
    dispatch({ type: SET_MESSAGE, payload: msg });
  };

  const displaySuccessToast = (msg, autoHide = true) => {
    setType('success');
    setMessage(msg);
    setIsVisible(true, autoHide);
  };

  const displayErrorToast = (msg, autoHide = true) => {
    setType('error');
    setMessage(msg);
    setIsVisible(true, autoHide);
  };

  const displayInfoToast = (msg, autoHide = true) => {
    setType('info');
    setMessage(msg);
    setIsVisible(true, autoHide);
  };

  const displayWarningToast = (msg, autoHide = true) => {
    setType('warning');
    setMessage(msg);
    setIsVisible(true, autoHide);
  };

  const resetToast = () => {
    dispatch({ type: RESET_TOAST, payload: initialState });
  };

  return (
    <ToastContext.Provider
      value={{
        isVisible: state.isVisible,
        message: state.message,
        type: state.type,
        setIsVisible,
        setType,
        setMessage,
        displaySuccessToast,
        displayErrorToast,
        displayInfoToast,
        displayWarningToast,
        resetToast,
      }}>
      {children}
    </ToastContext.Provider>
  );
};
