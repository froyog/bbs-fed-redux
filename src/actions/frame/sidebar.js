import { parseUser } from '../../util';
import { CALL_API } from '../../middlewares/callApi';

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

export const toggleSidebar = openStatus => ({
    type: TOGGLE_SIDEBAR,
    isOpen: openStatus,
});

export const GET_UNREAD_REQUEST = 'GET_UNREAD_REQUEST';
export const GET_UNREAD_SUCCESS = 'GET_UNREAD_SUCCESS';
export const GET_UNREAD_FAILURE = 'GET_UNREAD_FAILURE';

export const getUnreadMessage = () => (dispatch, getState) => {
    const authenication = parseUser(getState());
    return dispatch({
        [CALL_API]: {
            types: [GET_UNREAD_REQUEST, GET_UNREAD_SUCCESS, GET_UNREAD_FAILURE],
            apiPath: `home/message/count`,
            request: {
                method: 'GET',
                headers: {
                    auth: authenication,
                },
            },
        },
    });
};
