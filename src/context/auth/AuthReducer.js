import * as actions from './AuthTypes';

const AuthReducer = (state, { type, payload }) => {
  switch (type) {
    case actions.LOADING:
      return {
        ...state,
        isLoading: true,
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

    default:
      throw new Error(`No matching action type: ${type}`);
  }
};

export default AuthReducer;
