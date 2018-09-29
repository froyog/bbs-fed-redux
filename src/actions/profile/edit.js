import { parseUser } from '../../util';
import { CALL_API } from '../../middlewares/callApi';

export const EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAILURE = 'EDIT_PROFILE_FAILURE';

export const saveProfile = editedProfile => (dispatch, getState) => {
    const authenication = parseUser(getState());
    return dispatch({
        [CALL_API]: {
            types: [EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAILURE],
            apiPath: 'home',
            request: {
                method: 'PUT',
                body: JSON.stringify(editedProfile),
                headers: {
                    auth: authenication,
                    contentType: 'application/json',
                },
            },
        },
    });
};

export const AVATAR_UPLOAD_REQUEST = 'AVATAR_UPLOAD_REQUEST';
export const AVATAR_UPLOAD_SUCCESS = 'AVATAR_UPLOAD_SUCCESS';
export const AVATAR_UPLOAD_FAILURE = 'AVATAR_UPLOAD_FAILURE';

export const uploadAvatar = fileData => (dispatch, getState) => {
    const authentication = parseUser(getState());
    dispatch({
        [CALL_API]: {
            types: [AVATAR_UPLOAD_REQUEST, AVATAR_UPLOAD_SUCCESS, AVATAR_UPLOAD_FAILURE],
            apiPath: 'home/avatar',
            request: {
                method: 'PUT',
                body: fileData,
                headers: {
                    auth: authentication,
                },
            },
        },
    });
};
