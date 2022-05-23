import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastProvider } from './context/Toast/ToastProvider';
import AppRouter from './routers/AppRouter';
import './sass/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  </React.StrictMode>
);
