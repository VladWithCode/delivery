import React from 'react';
import Checkbox from '../Forms/Checkbox';
import Filter from './Filter';

function CtgFilters() {
  return (
    <Filter title='Por Categoria'>
      <Checkbox
        isChecked={false}
        name='filter-cat-asada'
        label='Asada'
        classNames={{
          wrapper: 'card__row',
          input: 'filter__input',
          label: 'filter__label fs-4',
        }}
      />
      <Checkbox
        isChecked={false}
        name='filter-cat-pastor'
        label='Pastor'
        classNames={{
          wrapper: 'card__row',
          input: 'filter__input',
          label: 'filter__label fs-4',
        }}
      />
    </Filter>
  );
}

export default CtgFilters;
