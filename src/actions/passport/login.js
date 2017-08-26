import { CALL_API } from '../../middlewares/callApi';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const postLoginInfo = loginInfo => ({
    [CALL_API]: {
        types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
        apiPath: `passport/login`,
        request: {
            method: 'POST',
            body: loginInfo,
            headers: {
                contentType: 'application/json'
            }
        }
    }
});

export const login = loginInfo => dispatch =>
    dispatch(postLoginInfo(loginInfo));
