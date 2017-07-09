import Immutable from 'immutable';
import * as ActionTypes from '../actions/forumList';


const defaultState = Immutable.fromJS({
    isFetching: false,
    items: []
})

export const forumList = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_FORUMLIST:
            return state.set('isFetching', true);
        case ActionTypes.RECEIVE_FORUMLIST:
            return Immutable.Map({
                'isFetching': false,
                'items': Immutable.fromJS(action.json.data),
                'reachTime': action.receivedAt
            });
        default:
            return state;

    }
}
