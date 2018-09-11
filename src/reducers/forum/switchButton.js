import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../../actions/forum/switchButton';

// all state in one reducer
const switchButton = (state = fromJS({
    isFetching: false,
    success: '',
    error: '',
    requestId: 0
}), action) => {
    switch (action.type) {
        case ActionTypes.FOLLOW_BOARD_REQUEST:
        case ActionTypes.UNFOLLOW_BOARD_REQUEST:
        case ActionTypes.COLLECT_THREAD_REQUEST:
        case ActionTypes.UNCOLLECT_THREAD_REQUEST:
        case ActionTypes.LIKE_THREAD_REQUEST:
        case ActionTypes.UNLIKE_THREAD_REQUEST:
        case ActionTypes.LIKE_POST_REQUEST:
        case ActionTypes.UNLIKE_POST_REQUEST:
        case ActionTypes.LOCK_THREAD_REQUEST:
        case ActionTypes.UNLOCK_THREAD_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.FOLLOW_BOARD_SUCCESS:
        case ActionTypes.UNFOLLOW_BOARD_SUCCESS:
        case ActionTypes.COLLECT_THREAD_SUCCESS:
        case ActionTypes.UNCOLLECT_THREAD_SUCCESS:
        case ActionTypes.LIKE_THREAD_SUCCESS:
        case ActionTypes.UNLIKE_THREAD_SUCCESS:
        case ActionTypes.LIKE_POST_SUCCESS:
        case ActionTypes.UNLIKE_POST_SUCCESS:
        case ActionTypes.LOCK_THREAD_SUCCESS:
        case ActionTypes.UNLOCK_THREAD_SUCCESS:
            return Map({
                'isFetching': false,
                'success': fromJS(action.json.data),
                'requestId': action.requestId
            });
        case ActionTypes.FOLLOW_BOARD_FAILURE:
        case ActionTypes.UNFOLLOW_BOARD_FAILURE:
        case ActionTypes.COLLECT_THREAD_FAILURE:
        case ActionTypes.UNCOLLECT_THREAD_FAILURE:
        case ActionTypes.LIKE_THREAD_FAILURE:
        case ActionTypes.UNLIKE_THREAD_FAILURE:
        case ActionTypes.LIKE_POST_FAILURE:
        case ActionTypes.UNLIKE_POST_FAILURE:
        case ActionTypes.LOCK_THREAD_FAILURE:
        case ActionTypes.UNLOCK_THREAD_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error),
                'requestId': action.requestId,
                
            });
        default:
            return state;
    }
};

export default switchButton;