import { createContext, useContext, useReducer } from 'react';
import BookmarkReducer from './BookMarkReducer';

const INITIAL_STATE = {
  bookmark: null,
};

const BookmarkContext = createContext(INITIAL_STATE);

const BookmarkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BookmarkReducer, INITIAL_STATE);

  return (
    <BookmarkContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useGlobalBookmarkContext = () => {
  return useContext(BookmarkContext);
};

export { BookmarkProvider };
