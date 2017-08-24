import { CALL_API } from '../middlewares/callApi';


export const GET_BOARD_REQUEST = 'GET_BOARD_REQUEST';
export const GET_BOARD_SUCCESS = 'GET_BOARD_SUCCESS';
export const GET_BOARD_FAILURE = 'GET_BOARD_FAILURE';

const fetchBoard = (bid, page, type, order) => {
    return ({
        // page minus 1 for the reason that the server-side page starts from 0
        [CALL_API]: {
            types: [GET_BOARD_REQUEST, GET_BOARD_SUCCESS, GET_BOARD_FAILURE],
            apiPath: `board/${bid}/page/${page - 1}`
        },
        bid: bid,
        page: page,
        threadType: type,
        order: order
    });
};

export const getBoard = (bid, page, type, order) => dispatch =>
    dispatch(fetchBoard(bid, page, type, order));
