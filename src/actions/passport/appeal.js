import { CALL_API } from '../../middlewares/callApi';


export const SEND_APPEAL_REQUEST = 'SEND_APPEAL_REQUEST';
export const SEND_APPEAL_SUCCESS = 'SEND_APPEAL_SUCCESS';
export const SEND_APPEAL_FAILURE = 'SEND_APPEAL_FAILURE';

export const sendAppeal = ({ username, cid, realname, stunum, email, message }) => dispatch => {
    return dispatch({
        [CALL_API]: {
            types: [SEND_APPEAL_REQUEST, SEND_APPEAL_SUCCESS, SEND_APPEAL_FAILURE],
            apiPath: 'passport/appeal',
            request: {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    cid,
                    real_name: realname,
                    stunum,
                    email,
                    message
                }),
                headers: {
                    contentType: 'application/json'
                }
            }
        }
    });
};