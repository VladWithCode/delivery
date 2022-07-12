import React, { useContext, useEffect, useState } from 'react';
import MenuContext from '../../context/Menu/MenuContext';
import ToastContext from '../../context/Toast/ToastContext';
import ShopService from '../../services/ShopService';
import Listing from './Listing';

function Menu() {
  const { menu, setMenu, ctgs } = useContext(MenuContext);
  const { displayErrorToast } = useContext(ToastContext);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await ShopService.fetchProducts();

      if (res.status !== 'OK') {
        if (res.error) console.log(res.error);
        displayErrorToast(res.message || res.error.message);
        return;
      }

      setMenu(Object.keys(res.products).length > 0 ? res.products : {});
      setInitializing(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className='menu container container--grid pb-5'>
      <h1 className='menu__title heading'>Menu</h1>
      <h5 className='menu__subtitle subtitle'>¿Qué se te antoja comer hoy?</h5>
      {Object.keys(menu)
        .filter(ctg => ctgs.length === 0 || ctgs.includes(ctg))
        .map(ctg => (
          <Listing initializing={initializing} ctg={ctg} key={ctg} />
        ))}
    </div>
  );
}

export default Menu;
