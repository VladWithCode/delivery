import React from 'react';
import ReactDOM from 'react-dom/client';
import { CartProvider } from './context/Cart/CartProvider';
import { MenuProvider } from './context/Menu/MenuProvider';
import { ModalProvider } from './context/Modal/ModalProvider';
import OrderProvider from './context/Order/OrderProvider';
import { SidebarProvider } from './context/Sidebar/SidebarProvider';
import { ToastProvider } from './context/Toast/ToastProvider';
import AppRouter from './routers/AppRouter';
import './sass/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MenuProvider>
      <ToastProvider>
        <ModalProvider>
          <CartProvider>
            <OrderProvider>
              <SidebarProvider>
                <AppRouter />
              </SidebarProvider>
            </OrderProvider>
          </CartProvider>
        </ModalProvider>
      </ToastProvider>
    </MenuProvider>
  </React.StrictMode>
);
