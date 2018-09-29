import { CALL_API } from '../../middlewares/callApi';
import { parseUser } from '../../util';
import { GET_BOARD_FAILURE } from '../forum/board';

// duplicate of bbsIndex latest part
export const GET_MESSAGE_REQUEST = 'GET_MESSAGE_REQUEST';
export const GET_MESSAGE_SUCCESS = 'GET_MESSAGE_SUCCESS';
export const GET_MESSAGE_FAILURE = 'GET_MESSAGE_FAILURE';
export const INVAILDATE_MESSAGES = 'INVAILDATE_MESSAGES';

const shouldFetchMessages = messageSliceState => {
    if (!messageSliceState.get('messages').length) {
        return true;
    } else if (messageSliceState.get('isFetching')) {
        return false;
    } else {
        return messageSliceState.get('didInvaildate');
    }
};

export const getMessages = page => (dispatch, getState) => {
    if (shouldFetchMessages(getState().get('messages'))) {
        const authentication = parseUser(getState());
        return dispatch({
            [CALL_API]: {
                types: [GET_MESSAGE_REQUEST, GET_MESSAGE_SUCCESS, GET_MESSAGE_FAILURE],
                apiPath: `home/message/page/${page}`,
                request: {
                    method: 'GET',
                    headers: {
                        auth: authentication,
                    },
                },
            },
            page: page,
        });
    }
};

export const refreshMessages = () => dispatch => {
    return dispatch({ type: INVAILDATE_MESSAGES });
};

export const SEND_PRIVATE_REQUEST = 'SEND_PRIVATE_REQUEST';
export const SEND_PRIVATE_SUCCESS = 'SEND_PRIVATE_SUCCESS';
export const SEND_PRIVATE_FAILURE = 'SEND_PRIVATE_FAILURE';

export const sendPrivateMessage = (targetUid, content) => (dispatch, getState) => {
    const authentication = parseUser(getState());
    return dispatch({
        [CALL_API]: {
            types: [SEND_PRIVATE_REQUEST, SEND_PRIVATE_SUCCESS, SEND_PRIVATE_FAILURE],
            apiPath: `home/message`,
            request: {
                method: 'POST',
                body: JSON.stringify({
                    to_uid: targetUid,
                    content: content,
                }),
                headers: {
                    contentType: 'application/json',
                    auth: authentication,
                },
            },
        },
        targetUid: targetUid,
    });
};

// read message
export const SEND_READ_REQUEST = 'SEND_READ_REQUEST';
export const SEND_READ_SUCCESS = 'SEND_READ_SUCCESS';
export const SEND_READ_FAILURE = 'SEND_READ_FAILURE';

export const clearUnreadTag = () => (dispatch, getState) => {
    const authentication = parseUser(getState());
    return dispatch({
        [CALL_API]: {
            types: [SEND_READ_REQUEST, SEND_READ_SUCCESS, SEND_READ_FAILURE],
            apiPath: `home/message/read`,
            request: {
                method: 'POST',
                headers: {
                    auth: authentication,
                },
            },
        },
    });
};

export const GET_DIALOG_REQUEST = 'GET_DIALOG_REQUEST';
export const GET_DIALOG_SUCCESS = 'GET_DIALOG_SUCCESS';
export const GET_DIALOG_FAILURE = 'GET_DIALOG_FAILURE';

export const getDialog = (withUid, page) => (dispatch, getState) => {
    const authentication = parseUser(getState());
    return dispatch({
        [CALL_API]: {
            types: [GET_DIALOG_REQUEST, GET_DIALOG_SUCCESS, GET_BOARD_FAILURE],
            apiPath: `home/message/dialog/${withUid}/page/${page}`,
            request: {
                method: 'GET',
                headers: {
                    auth: authentication,
                },
            },
        },
        withUid: withUid,
    });
};
