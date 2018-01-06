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
                body: JSON.stringify({
                    nickname: editedProfile.nickname || '',
                    signature: editedProfile.signature || '',
                    old_password: editedProfile.old_password || '',
                    password: editedProfile.password || ''
                }),
                headers: {
                    auth: authenication,
                    contentType: 'application/json'
                }
            }
        }
    })
}