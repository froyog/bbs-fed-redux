import { CALL_API } from '../../middlewares/callApi';
import { parseUser } from '../../util'; 

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

const fetchProfile = (uid, authentication) => {
    let profileAction;
    // add authentication for self profile request
    if (uid === 'me' && authentication) {
        const selfUid = authentication.substring(0, authentication.indexOf('|'));
        profileAction = {
            [CALL_API]: {
                types: [GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE],
                apiPath: 'home',
                request: {
                    method: 'GET',
                    headers: {
                        auth: authentication
                    }
                }
            },
            uid: +selfUid,
        };
    } else {
        profileAction = {
            [CALL_API]: {
                types: [GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE],
                apiPath: `user/${uid}/home`
            },
            uid: +uid
        };
    }
    return profileAction;
};

export const getProfileIfNeeded = uid => (dispatch, getState) => {
    const profileByUid = getState().getIn(['profile', uid]);
    if (profileByUid) {
        return null;
    }
    const authentication = parseUser(getState());
    return dispatch(fetchProfile(uid, authentication));
};