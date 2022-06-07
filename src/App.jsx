import { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Toast from './components/Toast/Toast';
import CartContext from './context/Cart/CartContext';
import SidebarContext from './context/Sidebar/SidebarContext';
import CartService from './services/CartService';

function App() {
  const location = useLocation();
  const { isActive, setIsActive, contentId } = useContext(SidebarContext);
  const { setCart } = useContext(CartContext);
  const [cartInitialized, setCartInitialized] = useState(false);
  const [isMenuPage, setIsMenuPage] = useState(false);

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

  useEffect(() => {
    if (location.pathname === '/') setIsMenuPage(true);
    else setIsMenuPage(false);
  }, [location]);

  return (
    <>
      <Header />

      <div
        className={'header__toggler'
          .concat(!isMenuPage ? ' header__toggler--bar-toggler' : '')
          .concat(isActive ? ' active' : '')}
        onClick={() => setIsActive(!isActive)}>
        <span className='bar bar--1'></span>
        {isMenuPage ? (
          <span className='text'>FILTROS</span>
        ) : (
          <span className='bar bar--2'></span>
        )}
        <span className='bar bar--3'></span>
      </div>

      <Outlet />
      <Sidebar />
      {/* <Footer /> */}
      <Toast />
    </>
  );
}

export default App;
