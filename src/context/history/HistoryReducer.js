import { CREATE_HISTORIES, FETCH_HISTORIES } from './HistoryTypes';

const HistoryReducer = (state, { payload, type }) => {
  switch (type) {
    case FETCH_HISTORIES:
      return {
        ...state,
        views: payload,
      };

    case CREATE_HISTORIES:
      return {
        ...state,
        views: [...state.views, payload],
      };

    default:
      throw new Error(`No matching action type: ${type}`);
  }
};

export default HistoryReducer;
