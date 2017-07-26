import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../actions/forumList';

const defaultState = fromJS({
    isFetching: false,
    items: []
});

const boardList = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_BOARDLIST_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.GET_BOARDLIST_SUCCESS:
            return Map({
                'isFetching': false,
                'items': fromJS(action.json.data)
            });
        default:
            return state;
    }
};

const boardListByFid = (state = Map(), action) => {
    switch (action.type) {
        case ActionTypes.GET_BOARDLIST_REQUEST:
        case ActionTypes.GET_BOARDLIST_SUCCESS:
            return state.set(
                ''+action.fid, boardList(state.get(action['fid']), action)
            );
        default:
            return state;
    }
};

export default boardListByFid;
