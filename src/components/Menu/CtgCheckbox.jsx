import React from 'react';
import Checkbox from '../Forms/Checkbox';

function CtgCheckbox({ ctg, active, handleClick }) {
  const onChange = (_, checked, value) => {
    handleClick(checked, value);
  };

  return (
    <Checkbox
      isChecked={active}
      name={`filter-ctg-${ctg.toLowerCase()}`}
      label={ctg}
      classNames={{
        wrapper: 'card__row',
        input: 'filter__input',
        label: 'filter__label fs-4',
      }}
      value={ctg}
      onChange={onChange}
    />
  );
}

export default CtgCheckbox;
