import {
    LOGOUT,
    LOADING,
    ADD_STORY,
    HIDE_ALERT,
    LOGIN_START,
    DELETE_STORY,
    FETCH_STORIES,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    UPDATE_STORY,
} from './types';

const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_STORIES:
            return {
                ...state,
                stories: action.payload,
                isLoading: false,
            };

        case LOADING:
            return {
                ...state,
                isLoading: true,
            };

        case ADD_STORY:
            const newStory = [action.payload, ...state.stories];

            return {
                ...state,
                stories: newStory,
                alert: {
                    show: true,
                    type: 'teal lighten-2',
                    msg: 'Story successfully created!',
                },
            };

        case UPDATE_STORY:
            return {
                ...state,
                alert: {
                    show: true,
                    type: 'teal lighten-2',
                    msg: 'Story successfully updated!',
                },
            };

        case DELETE_STORY:
            const updStory = state.stories.filter(story => story.id !== action.payload);

            return {
                ...state,
                stories: updStory,
                alert: {
                    show: true,
                    type: 'red',
                    msg: 'Story successfully deleted!',
                },
            };

        case LOGIN_START:
            return {
                ...state,
                isLoading: true,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                error: false,
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                user: null,
                error: true,
                isLoading: false,
            };

        case LOGOUT:
            return {
                ...state,
                user: null,
            };

        case HIDE_ALERT:
            return {
                ...state,
                alert: {
                    show: false,
                    type: '',
                    msg: '',
                },
            };

        default:
            throw new Error('No matching action type');
    };
};

export default reducer;
