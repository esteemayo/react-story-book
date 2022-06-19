import jwtDecode from 'jwt-decode';
import { useContext, useReducer, createContext } from 'react';

import * as actions from './AuthTypes';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  user: null,
  error: false,
  isLoading: false,
};

const tokenKey = 'jwtToken';
const token = localStorage.getItem(tokenKey);

if (token) {
  const decodedToken = jwtDecode(token);
  const expiryDate = Date.now();

  if (decodedToken.exp * 1000 < expiryDate) {
    localStorage.removeItem(tokenKey);
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
    localStorage.setItem(tokenKey, userData.token);
    dispatch({
      type: actions.LOGIN_SUCCESS,
      payload: userData,
    });
  };

  const loginFailure = () => {
    dispatch({ type: actions.LOGIN_FAILURE });
  };

  const logout = () => {
    localStorage.removeItem(tokenKey);
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
