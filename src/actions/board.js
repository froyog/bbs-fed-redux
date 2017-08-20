import { CALL_API } from '../middlewares/callApi';


export const GET_BOARD_REQUEST = 'GET_BOARD_REQUEST';
export const GET_BOARD_SUCCESS = 'GET_BOARD_SUCCESS';
export const GET_BOARD_FAILURE = 'GET_BOARD_FAILURE';

const fetchBoard = (bid, page) => ({
    [CALL_API]: {
        types: [GET_BOARD_REQUEST, GET_BOARD_SUCCESS, GET_BOARD_FAILURE],
        apiPath: `board/${bid}/page/${page}`
    },
    bid: bid,
    page: page
});

export const getBoard = (bid, page) => dispatch =>
    dispatch(fetchBoard(bid, page));
