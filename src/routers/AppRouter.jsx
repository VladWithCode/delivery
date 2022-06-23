import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import Checkout from '../components/Checkout/Checkout';
import Dashboard from '../components/Dashboard/Dashboard';
import Orders from '../components/Dashboard/Orders';
import Sales from '../components/Dashboard/Sales';
import Signin from '../components/Dashboard/Signin';
import Home from '../components/Home/Home';
import NotFound from '../components/NotFound/NotFound';
import Order from '../components/Order/Order';
import { DashboardProvider } from '../context/Dashboard/DashboardProvider';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='orden/:id' element={<Order />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='admin/sign-in' element={<Signin />} />
        <Route
          path='/admin'
          element={
            <DashboardProvider>
              <Dashboard />
            </DashboardProvider>
          }>
          <Route index element={<Orders />} />
          <Route path='ventas' element={<Sales />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
