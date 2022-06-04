import React, { useContext, useEffect, useState } from 'react';
import MenuContext from '../../context/Menu/MenuContext';
import Checkbox from '../Forms/Checkbox';
import CtgCheckbox from './CtgCheckbox';
import Filter from './Filter';

function CtgFilters() {
  const { menu, ctgs, setActiveCategories } = useContext(MenuContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let ctgs = [];

    for (const ctg in menu) {
      ctgs.push(ctg);
    }

    setCategories(ctgs);
  }, [menu]);

  const handleCheckboxClick = (checked, category) => {
    if (!checked) {
      setActiveCategories(ctgs.filter(ctg => ctg !== category));
      return;
    }

    if (!ctgs.includes(category)) {
      setActiveCategories([...ctgs, category]);
    }
  };

  return (
    <Filter title='Por Categoria'>
      {categories.map(ctg => (
        <CtgCheckbox
          ctg={ctg}
          active={ctgs.includes(ctg)}
          handleClick={handleCheckboxClick}
          key={ctg}
        />
      ))}
    </Filter>
  );
}

export default CtgFilters;
