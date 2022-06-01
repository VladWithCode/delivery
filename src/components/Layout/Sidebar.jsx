import React, { useContext, useRef, useState } from 'react';
import SidebarContext from '../../context/Sidebar/SidebarContext';
import Filters from '../Menu/Filters';
import Footer from './Footer';

function Sidebar() {
  const { isActive, setIsActive, contentId } = useContext(SidebarContext);
  const [contentElement, setContentElement] = useState(null);

  useState(() => {
    switch (contentId) {
      case 'NAVIGATION':
        break;
      case 'FILTERS':
      default:
        setContentElement(<Filters />);
    }
  }, [contentId]);

  return (
    <aside
      className={'menu__sidebar sidebar'.concat(isActive ? ' active' : '')}>
      <div
        className='sidebar__drop-shadow'
        onClick={() => setIsActive(false)}></div>
      <div className='sidebar__content'>
        <div className='sidebar__header'>
          <img src='/img/pollo.png' className='sidebar__logo' />
        </div>
        {!contentElement ? (
          <div className='spinner' style={{ '--sp-thickness': '7px' }}></div>
        ) : (
          <div className='sidebar__main'>{contentElement}</div>
        )}
        <div className='sidebar__footer'>
          <Footer />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
