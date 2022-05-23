import React, { useContext } from 'react';
import ToastContext from '../../context/Toast/ToastContext';

function Toast() {
  const { type, message, isVisible, resetToast } = useContext(ToastContext);

  const handleCloseClick = e => {
    resetToast();
  };

  return (
    <div className={`toast ${isVisible ? 'visible ' : ''}${type}`}>
      <p className='toast__content'>{message}</p>
      <span className='toast__close' onClick={handleCloseClick}>
        &times;
      </span>
    </div>
  );
}

export default Toast;
