import { useEffect, useReducer, useState } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import {
  SET_IS_ADMIN,
  SET_IS_AUTHENTICATED,
  SET_REDIRECT_TO,
  SET_USER,
} from './types';
import { checkAuth } from '../../services/AuthService';

export const AuthProvider = ({ children }) => {
  const [init, setInit] = useState(false);
  const initialState = {
    isAuthenticated: false,
    isAdmin: false,
    user: null,
    redirectTo: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setUser = user => {
    dispatch({ type: SET_USER, payload: user });
  };

  const setIsAuthenticated = auth => {
    dispatch({ type: SET_IS_AUTHENTICATED, payload: auth });
  };

  const setIsAdmin = isAdmin => {
    dispatch({ type: SET_IS_ADMIN, payload: isAdmin });
  };

  const setRedirectTo = to => {
    dispatch({ type: SET_REDIRECT_TO, payload: to });
  };

  useEffect(() => {
    const check = async () => {
      const user = await checkAuth();

      if (!user) return setUser(null);

      setUser(user);
    };

    check();
  }, []);

  useEffect(() => {
    setInit(true);
    if (!state.user) {
      setIsAuthenticated(false);
      setIsAdmin(false);

      return;
    }

    setIsAuthenticated(true);
    setIsAdmin(state.user.role === 'admin');
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
        user: state.user,
        redirectTo: state.redirectTo,
        init: init,
        setUser,
        setIsAuthenticated,
        setIsAdmin,
        setRedirectTo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
