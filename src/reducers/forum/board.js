import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../../actions/forum/board';


const board = (state = fromJS({
    isFetching: false,
    boardInfo: {},
    threadList: [],
    page: 0,
    order: '',
    type: '',
    error: ''
}), action) => {
    switch (action.type) {
        case ActionTypes.GET_BOARD_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.GET_BOARD_SUCCESS:
            return Map({
                'isFetching': false,
                'page': action.page,
                'order': action.order,
                'type': action.threadType,
                'boardInfo': fromJS(action.json.data.board),
                'threadList': fromJS(action.json.data.thread)
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
            return state.set(
                action.bid, board(state.get(action['bid']), action)
            );
        default:
            return state;
    }
};

export default boardByBid;
