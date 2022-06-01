import { useReducer } from 'react';
import SidebarContext from './SidebarContext';
import SidebarReducer from './SidebarReducer';
import { SET_CONTENT_ID, SET_IS_ACTIVE } from './types';

export const SidebarProvider = ({ children }) => {
  const initialState = {
    isActive: false,
    contentId: 'FILTERS', // FILTERS | NAVIGATION
  };

  const [state, dispatch] = useReducer(SidebarReducer, initialState);

  const setIsActive = isActive => {
    dispatch({ type: SET_IS_ACTIVE, payload: isActive });
  };

  const setContentId = id => {
    dispatch({ type: SET_CONTENT_ID, payload: id });
  };

  return (
    <SidebarContext.Provider
      value={{
        isActive: state.isActive,
        contentId: state.contentId,
        setIsActive,
        setContentId,
      }}>
      {children}
    </SidebarContext.Provider>
  );
};
