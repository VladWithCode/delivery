import React from 'react';
import ReactDOM from 'react-dom/client';
import { CartProvider } from './context/Cart/CartProvider';
import { ModalProvider } from './context/Modal/ModalProvider';
import OrderProvider from './context/Order/OrderProvider';
import { ToastProvider } from './context/Toast/ToastProvider';
import AppRouter from './routers/AppRouter';
import './sass/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ToastProvider>
      <ModalProvider>
        <CartProvider>
          <OrderProvider>
            <AppRouter />
          </OrderProvider>
        </CartProvider>
      </ModalProvider>
    </ToastProvider>
  </React.StrictMode>
);
