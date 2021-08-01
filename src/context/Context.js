import { useContext, useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

import reducer from './Reducer';

const initialStates = {
    user: null,
    error: false,
    isLoading: false
};

let token = localStorage.getItem('jwtToken');

if (token) {
    const decodedToken = jwtDecode(token);
    const expiryDate = Date.now();

    if (decodedToken.exp * 1000 < expiryDate) {
        localStorage.removeItem('jwtToken');
    } else {
        initialStates.user = decodedToken;
    }
}

const AppContext = createContext(initialStates);

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialStates);

    const loginStart = () => {
        dispatch({ type: 'LOGIN_START' });
    };

    const loginSuccess = userData => {
        localStorage.setItem('jwtToken', userData.token);
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: userData
        });
    };

    const loginFailure = () => {
        dispatch({ type: 'LOGIN_FAILURE' });
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AppContext.Provider value={{
            ...state,
            logout,
            dispatch,
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
