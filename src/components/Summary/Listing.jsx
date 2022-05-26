import React from 'react';
import Item from './Item';

function Listing({ items }) {
  return (
    <ul className='summary__items'>
      {items?.map(i => (
        <Item item={i} key={i.product} />
      ))}
      {items?.length === 0 && (
        <p className='summary__no-items'>
          No has agregado productos a tu carrito
        </p>
      )}
    </ul>
  );
}

export default Listing;
