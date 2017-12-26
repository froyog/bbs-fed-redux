import { CALL_API } from '../../middlewares/callApi';
import { parseUser } from '../../util';


export const GET_BOARD_REQUEST = 'GET_BOARD_REQUEST';
export const GET_BOARD_SUCCESS = 'GET_BOARD_SUCCESS';
export const GET_BOARD_FAILURE = 'GET_BOARD_FAILURE';

const fetchBoard = (bid, page, type, order) => {
    return ({
        // page minus 1 since server-side paging starts from 0
        [CALL_API]: {
            types: [GET_BOARD_REQUEST, GET_BOARD_SUCCESS, GET_BOARD_FAILURE],
            apiPath: `board/${bid}/page/${page - 1}?type=${type}&order=${order}`
        },
        bid: bid,
        page: page,
        threadType: type,
        order: order
    });
};

export const getBoard = (bid, page, type, order) => dispatch =>
    dispatch(fetchBoard(bid, page, type, order));


export const NEW_THREAD_REQUEST = 'NEW_THREAD_REQUEST';
export const NEW_THREAD_SUCCESS = 'NEW_THREAD_SUCCESS';
export const NEW_THREAD_FAILURE = 'NEW_THREAD_FAILURE';

export const fetchNewThread = (bid, title, content) => (dispatch, getState) => {
    const authentication = parseUser(getState());
    dispatch({
        [CALL_API]: {
            types: [NEW_THREAD_REQUEST, NEW_THREAD_SUCCESS, NEW_THREAD_FAILURE],
            apiPath: `board/${bid}`,
            request: {
                method: 'POST',
                body: JSON.stringify({title, content}),
                headers: {
                    contentType: 'application/json',
                    auth: authentication
                }
            }
        }
    });
};

export const DELETE_THREAD_REQUEST = 'DELETE_THREAD_REQUEST';
export const DELETE_THREAD_SUCCESS = 'DELETE_THREAD_SUCCESS';
export const DELETE_THREAD_FAILURE = 'DELETE_THREAD_FAILURE';

export const deleteThread = tid => (dispatch, getState) => {
    const authentication = parseUser(getState());
    dispatch({
        [CALL_API]: {
            types: [DELETE_THREAD_REQUEST, DELETE_THREAD_SUCCESS, DELETE_THREAD_FAILURE],
            apiPath: `thread/${tid}`,
            request: {
                method: 'DELETE',
                headers: {
                    auth: authentication
                }
            }
        }
    });
};