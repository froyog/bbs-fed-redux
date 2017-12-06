import { CALL_API } from '../../middlewares/callApi';
import { parseUser } from '../../util';

// duplicate of bbsIndex latest part
export const GET_MESSAGE_REQUEST = 'GET_MESSAGE_REQUEST';
export const GET_MESSAGE_SUCCESS = 'GET_MESSAGE_SUCCESS';
export const GET_MESSAGE_FAILURE = 'GET_MESSAGE_FAILURE';
export const INVAILDATE_MESSAGES = 'INVAILDATE_MESSAGES';

const shouldFetchMessages = (messageSliceState) => {
    console.log(messageSliceState);
    if (!messageSliceState.get('messages').length) {
        return true;
    } else if (messageSliceState.get('isFetching')) {
        return false;
    } else {
        return messageSliceState.get('didInvaildate');
    }
}

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
                        auth: authentication
                    }
                }
            },
            page: page
        })
    }
}

export const refreshMessages = () => dispatch => {
    return dispatch({ type: INVAILDATE_MESSAGES });
}