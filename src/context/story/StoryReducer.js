import * as actions from './StoryTypes';

const StoryReducer = (state, { type, payload }) => {
  switch (type) {
    case actions.FETCH_STORIES:
      return {
        ...state,
        isLoading: false,
        stories: payload.stories,
        counts: payload.totalStories,
        currentPage: payload.currentPage,
        numberOfPages: payload.numberOfPages,
      };

    case actions.FETCH_USER_STORIES:
      return {
        ...state,
        isLoading: false,
        userStories: payload,
      };

    case actions.RELATED_STORIES:
      return {
        ...state,
        isLoading: false,
        relatedStories: payload,
      };

    case actions.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };

    case actions.LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case actions.ADD_STORY:
      return {
        ...state,
        stories: [payload, ...state.stories],
        alert: {
          show: true,
          type: 'teal lighten-2',
          msg: 'Story successfully created!',
        },
      };

    case actions.UPDATE_STORY:
      return {
        ...state,
        stories: state.stories.map((item) =>
          item._id === payload.id ? payload.story : item
        ),
        userStories: state.userStories.map((item) =>
          item._id === payload.id ? payload.story : item
        ),
        alert: {
          show: true,
          type: 'teal lighten-2',
          msg: 'Story successfully updated!',
        },
      };

    case actions.DELETE_STORY:
      return {
        ...state,
        stories: state.stories.filter((item) => item._id !== payload),
        userStories: state.userStories.filter((item) => item._id !== payload),
        alert: {
          show: true,
          type: 'red',
          msg: 'Story successfully deleted!',
        },
      };

    case actions.HIDE_ALERT:
      return {
        ...state,
        alert: {
          show: false,
          type: '',
          msg: '',
        },
      };

    default:
      throw new Error(`No matching action type: ${type}`);
  }
};

export default StoryReducer;
