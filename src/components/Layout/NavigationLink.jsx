import React from 'react';
import { NavLink } from 'react-router-dom';

function NavigationLink({ classNameFn, label, to }) {
  return (
    <NavLink className={classNameFn} to={to}>
      {label}
    </NavLink>
  );
}

export default NavigationLink;
