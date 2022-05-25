import React, { useContext } from 'react';
import { SERVER_URL } from '../../config/globals';
import ModalContext from '../../context/Modal/ModalContext';
import { priceToString } from '../../utils/helpers';

function Item({ product }) {
  const { setModalActive, setModalInfo } = useContext(ModalContext);

  const handleItemClick = () => {
    setModalInfo({
      ...product,
      img: product.imgs[0],
      qty: 0,
    });
    setModalActive(true);
  };

  return (
    <li className='menu__item card' onClick={handleItemClick}>
      <img
        src={SERVER_URL.concat(product.imgs[0]) || '/img/pollo.png'}
        alt='imagen de producto'
        className='card__img'
      />
      <h4 className='card__title'>{product.name}</h4>
      <p className='card__description'>{product.description}</p>
      <p className='card__price'>${priceToString(product.price)}</p>
    </li>
  );
}

export default Item;
