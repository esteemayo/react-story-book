import jwtDecode from 'jwt-decode';
import { useContext, useReducer, createContext } from 'react';

import AuthReducer from './AuthReducer';
import * as actions from './AuthTypes';
import { getJwt } from 'services/userService';
import {
  getFromStorage,
  removeFromStorage,
  setToStorage,
  tokenKey,
} from 'utils';

const token = getJwt();
const user = getFromStorage(tokenKey);

const INITIAL_STATE = {
  user: user ?? null,
  error: false,
  isLoading: false,
};

if (token) {
  const decodedToken = jwtDecode(token);
  const expiryDate = Date.now();

  if (decodedToken.exp * 1000 < expiryDate) {
    removeFromStorage(tokenKey);
    INITIAL_STATE.user = null;
  } else {
    INITIAL_STATE.user = decodedToken;
  }
}

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const loginStart = () => {
    dispatch({ type: actions.LOGIN_START });
  };

  const loginSuccess = (userData) => {
    setToStorage(tokenKey, userData);
    dispatch({
      type: actions.LOGIN_SUCCESS,
      payload: userData,
    });
  };

  const loginFailure = () => {
    dispatch({ type: actions.LOGIN_FAILURE });
  };

  const logout = () => {
    removeFromStorage(tokenKey);
    dispatch({ type: actions.LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout,
        dispatch,
        loginStart,
        loginSuccess,
        loginFailure,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider };
