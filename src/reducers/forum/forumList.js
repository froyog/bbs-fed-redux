import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../../actions/forumList';

const defaultState = fromJS({
    isFetching: false,
    items: []
});

const forumList = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_FORUMLIST_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.GET_FORUMLIST_SUCCESS:
            return Map({
                'isFetching': false,
                'items': fromJS(action.json.data)
            });
        case ActionTypes.GET_FORUMLIST_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error)
            });
        default:
            return state;

    }
};

export default forumList;
