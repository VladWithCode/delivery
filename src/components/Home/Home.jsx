import React, { useContext, useEffect } from 'react';
import Menu from '../Menu/Menu';
import Modal from '../Modal/Modal';
import Summary from '../Summary/Summary';

function Home() {
  return (
    <>
      <Menu />
      <Summary />
      <Modal />
    </>
  );
}

export default Home;
