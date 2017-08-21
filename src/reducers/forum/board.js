import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../../actions/board';


const defaultState = fromJS({
    isFetching: false,
    boardInfo: {},
    threads: [],
    error: ''
});

const board = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_BOARD_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.GET_BOARD_SUCCESS:
            return Map({
                'isFetching': false,
                'boardInfo': fromJS(action.json.data.board),
                'threads': fromJS(action.json.data.thread)
            });
        case ActionTypes.GET_BOARD_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error)
            });
        default:
            return state;
    }
};

const boardByBid = (state = Map(), action) => {
    switch (action.type) {
        case ActionTypes.GET_BOARD_REQUEST:
        case ActionTypes.GET_BOARD_SUCCESS:
        case ActionTypes.GET_BOARD_FAILURE:
            return state.setIn(
                [action.bid, action.page], board(state.get(action['bid']), action)
            );
        default:
            return state;
    }
};

export default boardByBid;
