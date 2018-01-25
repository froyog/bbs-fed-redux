import { CALL_API } from '../../middlewares/callApi';

export const OLD_LOGIN_REQUEST = 'OLD_LOGIN_REQUEST';
export const OLD_LOGIN_SUCCESS = 'OLD_LOGIN_SUCCESS';
export const OLD_LOGIN_FAILURE = 'OLD_LOGIN_FAILURE';

export const oldLoginWith = loginInfo => dispatch =>
    dispatch({
        [CALL_API]: {
            types: [OLD_LOGIN_REQUEST, OLD_LOGIN_SUCCESS, OLD_LOGIN_FAILURE],
            apiPath: 'passport/login/old',
            request: {
                method: 'POST',
                body: JSON.stringify(loginInfo),
                headers: {
                    contentType: 'application/json'
                }
            }
        }
    });

export const OLD_REGISTER_REQUEST = 'OLD_REGISTER_REQUEST';
export const OLD_REGISTER_SUCCESS = 'OLD_REGISTER_SUCCESS';
export const OLD_REGISTER_FAILURE = 'OLD_REGISTER_FAILURE';

export const oldRegisterWith = registerInfo => dispatch =>
    dispatch({
        [CALL_API]: {
            types: [OLD_REGISTER_REQUEST, OLD_REGISTER_SUCCESS, OLD_REGISTER_FAILURE],
            apiPath: 'passport/register/old',
            request: {
                method: 'POST',
                body: JSON.stringify(registerInfo),
                headers: {
                    contentType: 'application/json'
                }
            }
        }
    });