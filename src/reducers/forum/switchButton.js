import { fromJS, Map } from 'immutable';
import bypassingFactory from '../bypassing';
import * as ActionTypes from '../../actions/forum/switchButton';

// all state in one reducer
const switchButton = (state = fromJS({
    isFetching: false,
    success: '',
    error: ''
}), action) => {
    switch (action.type) {
        case ActionTypes.FOLLOW_BOARD_REQUEST:
        case ActionTypes.UNFOLLOW_BOARD_REQUEST:
        case ActionTypes.COLLECT_THREAD_REQUEST:
        case ActionTypes.UNCOLLECT_THREAD_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.FOLLOW_BOARD_SUCCESS:
        case ActionTypes.UNFOLLOW_BOARD_SUCCESS:
        case ActionTypes.COLLECT_THREAD_SUCCESS:
        case ActionTypes.UNCOLLECT_THREAD_SUCCESS:
            return Map({
                'isFetching': false,
                'success': fromJS(action.json.data),
            });
        case ActionTypes.FOLLOW_BOARD_FAILURE:
        case ActionTypes.UNFOLLOW_BOARD_FAILURE:
        case ActionTypes.COLLECT_THREAD_FAILURE:
        case ActionTypes.UNCOLLECT_THREAD_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error)
            });
        default:
            return state;
    }
}

export default switchButton;