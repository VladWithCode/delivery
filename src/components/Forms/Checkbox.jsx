import React from 'react';

function Checkbox({
  isChecked,
  onChange,
  name,
  label,
  classNames = {},
  value,
}) {
  const handleChange = ({ target }) => {
    onChange(target.name, target.checked, value);
  };

  return (
    <div
      className={'form__group--check'.concat(
        classNames.wrapper ? ' ' + classNames.wrapper : ''
      )}>
      <div className='check-wrap'>
        <input
          type='checkbox'
          name={name}
          id={name}
          className={'form__check'.concat(
            classNames.input ? ' ' + classNames.input : ''
          )}
          checked={isChecked}
          onChange={handleChange}
        />
      </div>
      <p className='form__paraph'>
        <label
          htmlFor={name}
          className={'form__label'.concat(
            classNames.label ? ' ' + classNames.label : ''
          )}>
          {label}
        </label>
      </p>
    </div>
  );
}

export default Checkbox;
