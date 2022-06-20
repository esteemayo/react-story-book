import { createContext, useContext, useReducer } from 'react';
import HistoryReducer from './HistoryReducer';

const INITIAL_STATE = {
  views: [],
};

const HistoryContext = createContext(INITIAL_STATE);

const HistoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HistoryReducer, INITIAL_STATE);

  return (
    <HistoryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useGlobalHistoryContext = () => {
  return useContext(HistoryContext);
};

export { HistoryProvider };
