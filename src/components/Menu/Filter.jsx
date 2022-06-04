import React, { useEffect, useState } from 'react';

function Filter({ children, title, handleClean, handleApply }) {
  const [isActive, setIsActive] = useState(false);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (isActive) {
      setCanClose(true);
    }
  }, [isActive]);

  return (
    <div
      className={'filter card card--dark card--noshadow'
        .concat(isActive ? ' active' : '')
        .concat(canClose ? ' close' : '')}>
      <span
        className='filter__toggler'
        onClick={() => {
          setIsActive(!isActive);
        }}>
        <svg className='filter__toggle-arrow'>
          <use href='/svg/sprites.svg#angle'></use>
        </svg>
      </span>
      <div
        className='filter__header'
        onClick={() => {
          setIsActive(!isActive);
        }}>
        <p className='filter__title-out'>{title}</p>

        <p className='filter__title-in'>{title}</p>
      </div>
      <div className='filter__content'>{children}</div>
      {/* <div className='filter__controls'>
        <button
          className='filter__control filter__control--blue'
          onClick={handleClean}>
          Limpiar
        </button>
        <button
          className='filter__control filter__control--green'
          onClick={handleApply}>
          Aplicar
        </button>
      </div> */}
    </div>
  );
}

export default Filter;
