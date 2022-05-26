import React, { useContext, useEffect } from 'react';
import CartContext from '../../context/Cart/CartContext';
import CartService from '../../services/CartService';
import Menu from '../Menu/Menu';
import Modal from '../Modal/Modal';
import Summary from '../Summary/Summary';

function Home() {
  const { setCart } = useContext(CartContext);

  useEffect(() => {
    const initCart = async () => {
      const cart = await CartService.initCart(false);

      setCart(cart);
    };

    initCart();
  }, []);

  return (
    <>
      <Menu />
      <Summary />
      <Modal />
    </>
  );
}

export default Home;
