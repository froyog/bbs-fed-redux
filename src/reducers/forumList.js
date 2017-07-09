import { fromJS, set, Map } from 'immutable';
import * as ActionTypes from '../actions/forumList';


const defaultState = fromJS({
    isFetching: false,
    items: []
});

export const forumList = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_FORUMLIST:
            return set('isFetching', true);
        case ActionTypes.RECEIVE_FORUMLIST:
            return Map({
                'isFetching': false,
                'items': fromJS(action.json.data),
                'reachTime': action.receivedAt
            });
        default:
            return state;

    }
};
