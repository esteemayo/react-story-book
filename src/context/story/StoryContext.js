import { useContext, useReducer, createContext } from 'react';

import * as actions from './StoryTypes';
import StoryReducer from './StoryReducer';

const INITIAL_STATE = {
  error: false,
  stories: [],
  story: {},
  relatedStories: [],
  userStories: [],
  counts: null,
  currentPage: 1,
  numberOfPages: null,
  isLoading: false,
  alert: {
    show: false,
    type: '',
    msg: '',
  },
};

const StoryContext = createContext(INITIAL_STATE);

const StoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StoryReducer, INITIAL_STATE);

  const addStory = (story) => {
    dispatch({
      type: actions.ADD_STORY,
      payload: story,
    });
  };

  const editStory = (id, story) => {
    dispatch({
      type: actions.UPDATE_STORY,
      payload: {
        id,
        story,
      },
    });
  };

  const favStory = (story) => {
    dispatch({
      type: actions.LIKE_STORY,
      payload: story,
    });
  };

  const removeStory = (storyId) => {
    dispatch({
      type: actions.DELETE_STORY,
      payload: storyId,
    });
  };

  const findStory = (stories) => {
    dispatch({
      type: actions.SEARCH_STORY,
      payload: stories,
    });
  };

  const setCurrentPage = (page) => {
    dispatch({
      type: actions.SET_CURRENT_PAGE,
      payload: page,
    });
  };

  const hideAlert = () => {
    dispatch({ type: actions.HIDE_ALERT });
  };

  return (
    <StoryContext.Provider
      value={{
        ...state,
        dispatch,
        addStory,
        editStory,
        favStory,
        hideAlert,
        removeStory,
        setCurrentPage,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(StoryContext);
};

export { StoryProvider };
