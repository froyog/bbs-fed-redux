import { fromJS } from 'immutable';

const defaultState = fromJS({
    isAuthenticated: process.env.NODE_ENV === 'development',
    // skip authentication under development environment
});

const auth = (state = defaultState, action) => {
    switch (action.type) {
        case 'AUTH_PASS':
            return state.set('isAuthenticated', true);
        case 'AUTH_FAIL':
            return state.set('isAuthenticated', false);
        default:
            return state;
    }
};

export default auth;
