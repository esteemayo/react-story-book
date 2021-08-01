const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                ...state,
                isLoading: true
            };

        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                error: false
            };

        case 'LOGIN_FAILURE':
            return {
                ...state,
                user: null,
                error: true,
                isLoading: false,
            };

        case 'LOGOUT':
            return {
                ...state,
                user: null,
            };

        default:
            throw new Error('No matching action type');
    }
};

export default reducer;
