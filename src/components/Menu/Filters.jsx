import React from 'react';
import CtgFilters from './CtgFilters';
import PriceFilters from './PriceFilters';

function Filters() {
  return (
    <div className='filters'>
      <CtgFilters />
      <PriceFilters />
    </div>
  );
}

export default Filters;
