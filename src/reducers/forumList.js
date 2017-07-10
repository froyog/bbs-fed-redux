import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../actions/forumList';

const defaultState = fromJS({
    isFetching: false,
    items: []
});

export const forumList = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_FORUMLIST_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.GET_FORUMLIST_SUCCESS:
            return Map({
                'isFetching': false,
                'items': fromJS(action.json.data),
                'reachTime': action.receivedAt
            });
        default:
            return state;

    }
};
