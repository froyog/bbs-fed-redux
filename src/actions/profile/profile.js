import { CALL_API } from '../../middlewares/callApi';
import { parseUser } from '../../util'; 

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

const fetchProfile = (uid, authentication) => {
    const callApiArgs = {
        types: [GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE],
        apiPath: uid === 'me' ? 'home' : `user/${uid}/home`
    };
    // add authentication for self profile request
    if (uid === 'me' && authentication) {
        callApiArgs.request = {
            method: 'GET',
            headers: {
                auth: authentication
            }
        };
    }

    return {
        [CALL_API]: callApiArgs,
        uid: uid
    };
};

export const getProfileIfNeeded = uid => (dispatch, getState) => {
    const profileByUid = getState().getIn(['profile', uid]);
    if (profileByUid) {
        return null;
    }
    const authentication = parseUser(getState());
    return dispatch(fetchProfile(uid, authentication));
};