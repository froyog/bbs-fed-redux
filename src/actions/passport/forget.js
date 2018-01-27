import { CALL_API } from '../../middlewares/callApi';

export const FORGET_AUTH_REQUEST = 'FORGET_AUTH_REQUEST';
export const FORGET_AUTH_SUCCESS = 'FORGET_AUTH_SUCCESS';
export const FORGET_AUTH_FAILURE = 'FORGET_AUTH_FAILURE';

export const getForgetInfoWith = selfInfo => dispatch =>
    dispatch({
        [CALL_API]: {
            types: [FORGET_AUTH_REQUEST, FORGET_AUTH_SUCCESS, FORGET_AUTH_FAILURE],
            apiPath: 'passport/retrieve',
            request: {
                method: 'POST',
                body: JSON.stringify(selfInfo),
                headers: {
                    contentType: 'application/json'
                }
            }
        }
    });

export const FORGET_RESET_REQUEST = 'FORGET_RESET_REQUEST';
export const FORGET_RESET_SUCCESS = 'FORGET_RESET_SUCCESS';
export const FORGET_RESET_FAILURE = 'FORGET_RESET_FAILURE';

export const resetPasswordWith = resetInfo => dispatch =>
    dispatch({
        [CALL_API]: {
            types: [FORGET_RESET_REQUEST, FORGET_RESET_SUCCESS, FORGET_RESET_FAILURE],
            apiPath: 'passport/reset-pass',
            request: {
                method: 'POST',
                body: JSON.stringify(resetInfo),
                headers: {
                    contentType: 'application/json'
                }
            }
        },
        uid: resetInfo.uid
    });