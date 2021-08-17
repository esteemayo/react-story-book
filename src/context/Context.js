import { useContext, useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

import {
    LOGOUT,
    ADD_STORY,
    HIDE_ALERT,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from './types';
import reducer from './Reducer';

const initialStates = {
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
        initialStates.user = decodedToken;
    }
}

const AppContext = createContext(initialStates);

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialStates);

    const addStory = story => {
        dispatch({
            type: ADD_STORY,
            payload: story,
        });
    };

    const loginStart = () => {
        dispatch({ type: LOGIN_START });
    };

    const loginSuccess = userData => {
        localStorage.setItem(tokenKey, userData.token);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: userData
        });
    };

    const loginFailure = () => {
        dispatch({ type: LOGIN_FAILURE });
    };

    const logout = () => {
        localStorage.removeItem(tokenKey);
        dispatch({ type: LOGOUT });
    };

    const hideAlert = () => {
        dispatch({ type: HIDE_ALERT });
    };

    return (
        <AppContext.Provider value={{
            ...state,
            logout,
            dispatch,
            addStory,
            hideAlert,
            loginStart,
            loginSuccess,
            loginFailure,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
