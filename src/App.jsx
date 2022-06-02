import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Toast from './components/Toast/Toast';
import CartContext from './context/Cart/CartContext';
import SidebarContext from './context/Sidebar/SidebarContext';
import CartService from './services/CartService';

function App() {
  const { isActive, setIsActive } = useContext(SidebarContext);
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

      <div
        className={'header__toggler'.concat(isActive ? ' active' : '')}
        onClick={() => setIsActive(!isActive)}>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </div>

      <Outlet />
      <Sidebar />
      {/* <Footer /> */}
      <Toast />
    </>
  );
}

export default App;
