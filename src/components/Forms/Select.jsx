import React, { useState } from 'react';

function Select({ name, label, className = '', options = [] }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`select ${className} ${isActive ? 'active' : ''}`.trim()}>
      {label && (
        <label htmlFor={name} className='select__label'>
          {label}
        </label>
      )}
      <select name={name} id={name} className='select__control'>
        {options.map(o => (
          <option value={o.value}>{o.label}</option>
        ))}
      </select>
      <span className='select__arrow'>
        <svg className='icon'>
          <use href='/svg/sprites.svg#angle'></use>
        </svg>
      </span>
    </div>
  );
}

export default Select;
