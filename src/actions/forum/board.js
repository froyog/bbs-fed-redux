import { CALL_API } from '../../middlewares/callApi';


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

export const fetchNewThread = (bid, title, content) => dispatch => {
    dispatch({
        [CALL_API]: {
            types: [NEW_THREAD_REQUEST, NEW_THREAD_SUCCESS, NEW_THREAD_FAILURE],
            apiPath: `board/${bid}`,
            request: {
                method: 'POST',
                body: JSON.stringify({title, content}),
                headers: {
                    contentType: 'application/json'
                }
            }
        }
    });
};
