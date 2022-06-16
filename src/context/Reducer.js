import * as actions from './types';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case actions.FETCH_STORIES:
      return {
        ...state,
        stories: payload,
        isLoading: false,
      };

    case actions.LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case actions.ADD_STORY:
      const newStory = [payload, ...state.stories];

      return {
        ...state,
        stories: newStory,
        alert: {
          show: true,
          type: 'teal lighten-2',
          msg: 'Story successfully created!',
        },
      };

    case actions.UPDATE_STORY:
      return {
        ...state,
        alert: {
          show: true,
          type: 'teal lighten-2',
          msg: 'Story successfully updated!',
        },
      };

    case actions.DELETE_STORY:
      const updStory = state.stories.filter((story) => story.id !== payload);

      return {
        ...state,
        stories: updStory,
        alert: {
          show: true,
          type: 'red',
          msg: 'Story successfully deleted!',
        },
      };

    case actions.LOGIN_START:
      return {
        ...state,
        isLoading: true,
      };

    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isLoading: false,
        error: false,
      };

    case actions.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        error: true,
        isLoading: false,
      };

    case actions.LOGOUT:
      return {
        ...state,
        user: null,
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

export default reducer;
