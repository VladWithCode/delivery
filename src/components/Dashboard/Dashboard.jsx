import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardContext from '../../context/Dashboard/DashboardContext';
import SidebarContext from '../../context/Sidebar/SidebarContext';
import { useAuth } from '../../hooks/useAuth';
import { isEmptyObject } from '../../utils/helpers';
import Toast from '../Toast/Toast';
import DetailedOrder from './DetailedOrder';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';

function Dashboard() {
  const navigate = useNavigate();
  const { isActive, setIsActive } = useContext(SidebarContext);
  const { isAdmin, init } = useAuth();
  const { currentOrder } = useContext(DashboardContext);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    if (init && !isAdmin) {
      navigate('/admin/sign-in', { replace: true });
    }
  }, [isAdmin, init]);

  useEffect(() => {
    if (isEmptyObject(currentOrder)) return;

    setModalActive(true);
  }, [currentOrder]);

  return (
    <>
      <Header />

      <div
        className={'header__toggler header__toggler--bar-toggler'.concat(
          isActive ? ' active' : ''
        )}
        onClick={() => setIsActive(!isActive)}>
        <span className='bar bar--1'></span>
        <span className='bar bar--2'></span>
        <span className='bar bar--3'></span>
      </div>

      <Outlet />
      <Sidebar />
      <Toast />
      <DetailedOrder active={modalActive} setActive={setModalActive} />
    </>
  );
}

export default Dashboard;
