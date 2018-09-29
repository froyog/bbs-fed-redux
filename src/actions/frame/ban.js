import { CALL_API } from '../../middlewares/callApi';
import { parseUser } from '../../util';

export const BAN_USER_REQUEST = 'BAN_USER_REQUEST';
export const BAN_USER_SUCCESS = 'BAN_USER_SUCCESS';
export const BAN_USER_FAILURE = 'BAN_USER_FAILURE';

export const banUser = (uid, board_id, duration, message) => (dispatch, getState) => {
    const authentication = parseUser(getState());
    dispatch({
        [CALL_API]: {
            types: [BAN_USER_REQUEST, BAN_USER_SUCCESS, BAN_USER_FAILURE],
            apiPath: `user/${uid}/ban`,
            request: {
                method: 'POST',
                body: JSON.stringify({ board_id, duration: Number(duration), message }),
                headers: {
                    contentType: 'application/json',
                    auth: authentication,
                },
            },
        },
    });
};
