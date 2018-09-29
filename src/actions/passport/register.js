import { CALL_API } from '../../middlewares/callApi';

export const NEW_REGISTER_REQUEST = 'NEW_REGISTER_REQUEST';
export const NEW_REGISTER_SUCCESS = 'NEW_REGISTER_SUCCESS';
export const NEW_REGISTER_FAILURE = 'NEW_REGISTER_FAILURE';

export const newRegister = ({ username, password, cid, stunum, realname }) => dispatch => {
    return dispatch({
        [CALL_API]: {
            types: [NEW_REGISTER_REQUEST, NEW_REGISTER_SUCCESS, NEW_REGISTER_FAILURE],
            apiPath: 'passport/register/new',
            request: {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password,
                    cid,
                    stunum,
                    real_name: realname,
                }),
                headers: {
                    contentType: 'application/json',
                },
            },
        },
    });
};
