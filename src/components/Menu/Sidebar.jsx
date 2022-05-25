import React, { useRef } from 'react';

function Sidebar({ state }) {
  const ref = useRef(null);

  return (
    <aside
      className={'menu__sidebar sidebar'.concat(
        state.isSidebarActive ? ' active' : ''
      )}
      onClick={e => {
        if (e.target !== ref.current) return;

        state.setIsSidebarActive(false);
      }}
      ref={ref}>
      <div className='sidebar__content'></div>
    </aside>
  );
}

export default Sidebar;
