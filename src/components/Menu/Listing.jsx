import React, { useContext, useEffect, useState } from 'react';
import MenuContext from '../../context/Menu/MenuContext';
import Item from './Item';

function Listing({ initializing, ctg }) {
  const { prices, getCategoryProducts } = useContext(MenuContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const rawProducts = getCategoryProducts(ctg);
    const visibleProducts = [];

    rawProducts.forEach(product => {
      if (
        product.price > prices.min ||
        (prices.max !== -1 && product.price < prices.max)
      )
        visibleProducts.push(product);
    });

    setProducts(visibleProducts);
  }, [prices.min, prices.max]);

  return (
    <ul className='menu__listing'>
      {initializing ? (
        <p className='menu__spinner'></p>
      ) : (
        products.map(p => <Item product={p} key={p.sku} />)
      )}

      {/* If no products are found after initializing display feedback */}
      {products?.length <= 0 && !initializing && (
        <p className='menu__no-items'>No se encontraron productos</p>
      )}
    </ul>
  );
}

export default Listing;
