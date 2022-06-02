import React, { useContext, useEffect, useState } from 'react';
import ToastContext from '../../context/Toast/ToastContext';
import ShopService from '../../services/ShopService';
import Listing from './Listing';

function Menu() {
  const { displayErrorToast } = useContext(ToastContext);
  const [initializing, setInitializing] = useState(true);
  const [products, setProducts] = useState([]);
  const [options, setOptions] = useState({
    skip: 0,
    limit: 8,
    ctg: '',
    size: '',
  });

  const { skip, limit, ctg, size } = options;

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await ShopService.fetchProducts({ skip, limit, ctg, size });
      setInitializing(false);

      if (res.status !== 'OK') {
        if (res.error) console.log(res.error);
        displayErrorToast(res.message || res.error.message);
        return;
      }

      const sortedProducts = res.products?.sort((a, b) => {
        return b.price - a.price;
      });

      setProducts(sortedProducts.length > 0 ? res.products : []);
    };

    fetchProducts();
  }, []);

  return (
    <div className='menu container'>
      <h1 className='menu__title heading'>Pollo</h1>
      <h5 className='menu__subtitle subtitle'>¿Qué se te antoja comer hoy?</h5>
      <Listing initializing={initializing} products={products} />
    </div>
  );
}

export default Menu;
