import { GET_SELF_PROFILE_SUCCESS } from '../actions/profile/profile';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/passport/log-io';
import { FORGET_RESET_REQUEST } from '../actions/passport/forget';

export default (dispatch, getState) => next => action => {
    if (window._paq) {
        let tracker = [];
        switch (action.type) {
            case GET_SELF_PROFILE_SUCCESS:
                const {
                    uid,
                    json: {
                        data: { name },
                    },
                } = action;
                tracker = ['setUserId', `[${uid}] ${name}`];
                break;
            case LOGIN_SUCCESS:
                tracker = ['trackEvent', 'Signing', 'Login'];
                break;
            case LOGOUT_SUCCESS:
                tracker = ['trackEvent', 'Signing', 'Logout'];
                break;
            case FORGET_RESET_REQUEST:
                tracker = ['trackEvent', 'Signing', 'Reset', `[${action.uid}]`];
                break;
            default:
                break;
        }
        if (tracker.length) {
            window._paq.push(tracker);
        }
    }

    return next(action);
};
