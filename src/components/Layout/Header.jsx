import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='header'>
      <h2 className='header__heading'>
        <Link to='/'>Su Taco</Link>
      </h2>
    </header>
  );
}

export default Header;
