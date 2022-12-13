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

  const fetchStories = (stories) => {
    dispatch({
      type: actions.FETCH_STORIES,
      payload: stories,
    });
  };

  const addStory = (story) => {
    dispatch({
      type: actions.ADD_STORY,
      payload: story,
    });
  };

  const fetchUserStories = (stories) => {
    dispatch({
      type: actions.FETCH_USER_STORIES,
      payload: stories,
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

  const showLoading = () => {
    dispatch({
      type: actions.LOADING,
    });
  };

  const hideLoading = () => {
    dispatch({
      type: actions.HIDE_LOADING,
    });
  };

  const hideAlert = () => {
    dispatch({
      type: actions.HIDE_ALERT,
    });
  };

  return (
    <StoryContext.Provider
      value={{
        ...state,
        dispatch,
        addStory,
        fetchStories,
        editStory,
        favStory,
        findStory,
        showLoading,
        hideLoading,
        hideAlert,
        removeStory,
        setCurrentPage,
        fetchUserStories,
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
