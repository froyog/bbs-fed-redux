import { CALL_API } from '../../middlewares/callApi';
import { parseUser } from '../../util'; 

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';
export const GET_SELF_PROFILE_REQUEST = 'GET_SELF_PROFILE_REQUEST';
export const GET_SELF_PROFILE_SUCCESS = 'GET_SELF_PROFILE_SUCCESS';
export const GET_SELF_PROFILE_FAILURE = 'GET_SELF_PROFILE_FAILURE';

export const fetchProfile = (uid, authentication, isMyself) => {
    if (isMyself) {
        return {
            [CALL_API]: {
                types: [GET_SELF_PROFILE_REQUEST, 
                    GET_SELF_PROFILE_SUCCESS, 
                    GET_SELF_PROFILE_FAILURE],
                apiPath: 'home',
                request: {
                    method: 'GET',
                    headers: {
                        auth: authentication
                    }
                }
            },
            uid: +uid,
        };
    }
    return {
        [CALL_API]: {
            types: [GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE],
            apiPath: `user/${uid}/home`
        },
        uid: +uid
    };
};

export const getProfileIfNeeded = (locationUid, forceUpdate) => (dispatch, getState) => {
    const uid = locationUid === 'me'
        ? getState().getIn(['user', 'uid'])
        : locationUid;

    const profileByUid = getState().getIn(['profiles', uid]);
    if (profileByUid && !forceUpdate) {
        return null;
    }

    const authentication = parseUser(getState());
    return dispatch(fetchProfile(uid, authentication, locationUid === 'me'));
};