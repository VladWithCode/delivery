import React from 'react';
import NavigationLink from '../../Layout/NavigationLink';

function Navigation() {
  const classNameFn = ({ isActive }) =>
    isActive ? 'footer__link footer__link--active' : 'footer__link';

  return (
    <div className='footer__navigation'>
      <NavigationLink classNameFn={classNameFn} to='/admin' label='Panel' />
      <NavigationLink
        classNameFn={classNameFn}
        to='/admin/stats'
        label='Stats'
      />
    </div>
  );
}

export default Navigation;
