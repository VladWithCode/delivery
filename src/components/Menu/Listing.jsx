import React from 'react';
import Item from './Item';

function Listing({ products, initializing }) {
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
