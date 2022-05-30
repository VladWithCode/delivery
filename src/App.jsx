import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Layout/Header';
import Toast from './components/Toast/Toast';
import CartContext from './context/Cart/CartContext';
import CartService from './services/CartService';

function App() {
  const { setCart } = useContext(CartContext);
  const [cartInitialized, setCartInitialized] = useState(false);

  useEffect(() => {
    if (!cartInitialized) {
      const initCart = async () => {
        const cart = await CartService.initCart(false);

        setCart(cart);
        setCartInitialized(true);
      };

      initCart();
    }
  }, [cartInitialized]);

  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
      <Toast />
    </>
  );
}

export default App;
