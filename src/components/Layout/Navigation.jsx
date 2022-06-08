import React from 'react';
import NavigationLink from './NavigationLink';

function Navigation() {
  const classNameFn = ({ isActive }) =>
    isActive ? 'footer__link footer__link--active' : 'footer__link';

  return (
    <nav className='footer__navigation'>
      <NavigationLink classNameFn={classNameFn} to='/' label='Inicio' />
      <NavigationLink
        classNameFn={classNameFn}
        to='/terminos'
        label='Terminos y Condiciones'
      />
      <NavigationLink
        classNameFn={classNameFn}
        to='/privacidad'
        label='Politica de Privacidad'
      />
      <NavigationLink
        classNameFn={classNameFn}
        to='/orden/buscar'
        label='Mi Orden'
      />
      <NavigationLink
        classNameFn={classNameFn}
        to='/contacto'
        label='Contacto'
      />
    </nav>
  );
}

export default Navigation;
