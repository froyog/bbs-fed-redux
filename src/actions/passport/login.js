import { CALL_API } from '../../middlewares/callApi';

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
    })