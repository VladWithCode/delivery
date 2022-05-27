import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import Checkout from '../components/Checkout/Checkout';
import Home from '../components/Home/Home';
import NotFound from '../components/NotFound/NotFound';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/pago' element={<Checkout />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
