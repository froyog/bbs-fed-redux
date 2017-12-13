import { CALL_API } from '../../middlewares/callApi';
import { parseUser } from '../../util';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (username, password) => dispatch =>
    dispatch({
        [CALL_API]: {
            types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
            apiPath: `passport/login`,
            request: {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password:password
                }),
                headers: {
                    contentType: 'application/json'
                }
            }
        }
    });

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const logout = () => (dispatch, getState) => {
    const authenication = parseUser(getState())
    dispatch({
        [CALL_API]: {
            types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
            apiPath: 'passport',
            request: {
                method: 'DELETE',
                headers: {
                    auth: authenication
                }
            }
        }
    });
}