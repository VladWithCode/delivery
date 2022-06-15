import React from 'react';
import NavigationLink from '../../Layout/NavigationLink';

function Navigation() {
  const classNameFn = ({ isActive }) =>
    isActive ? 'footer__link footer__link--active' : 'footer__link';

  return (
    <div className='footer__navigation'>
      <NavigationLink classNameFn={classNameFn} to='/admin' label='Ordenes' />
      <NavigationLink
        classNameFn={classNameFn}
        to='/admin/stats'
        label='Ventas'
      />
    </div>
  );
}

export default Navigation;
