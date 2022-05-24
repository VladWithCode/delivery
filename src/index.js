import React from 'react';
import ReactDOM from 'react-dom/client';
import { ModalProvider } from './context/Modal/ModalProvider';
import { ToastProvider } from './context/Toast/ToastProvider';
import AppRouter from './routers/AppRouter';
import './sass/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ToastProvider>
      <ModalProvider>
        <AppRouter />
      </ModalProvider>
    </ToastProvider>
  </React.StrictMode>
);
