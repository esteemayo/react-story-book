import { useContext, useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

import * as actions from './types';
import reducer from './Reducer';

const initialState = {
  user: null,
  error: false,
  stories: [],
  isLoading: false,
  alert: {
    show: false,
    type: '',
    msg: '',
  },
};

const tokenKey = 'jwtToken';
const token = localStorage.getItem(tokenKey);

if (token) {
  const decodedToken = jwtDecode(token);
  const expiryDate = Date.now();

  if (decodedToken.exp * 1000 < expiryDate) {
    localStorage.removeItem(tokenKey);
  } else {
    initialState.user = decodedToken;
  }
}

const AppContext = createContext(initialState);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addStory = (story) => {
    dispatch({
      type: actions.ADD_STORY,
      payload: story,
    });
  };

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

  const hideAlert = () => {
    dispatch({ type: actions.HIDE_ALERT });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        logout,
        dispatch,
        addStory,
        hideAlert,
        loginStart,
        loginSuccess,
        loginFailure,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
