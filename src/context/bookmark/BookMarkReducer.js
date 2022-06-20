import * as actions from './BookMarkTypes';

const BookmarkReducer = (state, { payload, type }) => {
  switch (type) {
    case actions.FETCH_BOOKMARK:
      return {
        ...state,
        bookmark: payload,
      };

    case actions.CREATE_BOOKMARK:
      return {
        ...state,
        bookmark: payload,
      };

    case actions.DELETE_BOOKMARK:
      return {
        ...state,
        bookmark: null,
      };

    default:
      throw new Error(`No matching action type: ${type}`);
  }
};

export default BookmarkReducer;
