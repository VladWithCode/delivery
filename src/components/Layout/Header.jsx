import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SidebarContext from '../../context/Sidebar/SidebarContext';

function Header() {
  const { isActive, setIsActive } = useContext(SidebarContext);

  return (
    <header className='header'>
      <h2 className='header__heading'>
        <Link to='/'>POLLO</Link>
      </h2>
      <div
        className={'header__toggler'.concat(isActive ? ' active' : '')}
        onClick={() => setIsActive(!isActive)}>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </div>
    </header>
  );
}

export default Header;
