import React, { useContext, useState } from 'react';
import SidebarContext from '../../../context/Sidebar/SidebarContext';
import Footer from './Footer';
import Navigation from './Navigation';

function Sidebar() {
  const { isActive, setIsActive } = useContext(SidebarContext);

  return (
    <aside
      className={'dashboard__sidebar sidebar'.concat(
        isActive ? ' active' : ''
      )}>
      <div
        className='sidebar__drop-shadow'
        onClick={() => setIsActive(false)}></div>
      <div className='sidebar__content'>
        <div className='sidebar__header'>
          <h2 className='sidebar__heading fs-4'>Su Taco | Administrador</h2>
        </div>
        <div className='sidebar__main'>
          <Navigation />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
