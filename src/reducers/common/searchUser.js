import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../../actions/common/search';

const searchUser = (
    state = fromJS({
        isFetching: false,
        result: [],
        error: '',
    }),
    action
) => {
    switch (action.type) {
        case ActionTypes.SEARCH_USER_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.SEARCH_USER_SUCCESS:
            return Map({
                isFetching: false,
                result: fromJS(action.json.data),
                error: '',
            });
        case ActionTypes.SEARCH_USER_FAILURE:
            return Map({
                isFetching: false,
                error: action.error,
            });
        default:
            return state;
    }
};

export default searchUser;
