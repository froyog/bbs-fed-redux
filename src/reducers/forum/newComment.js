import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../../actions/forum/thread';

const newComment = (
    state = fromJS({
        isFetching: false,
        pid: 0,
        error: '',
    }),
    action
) => {
    switch (action.type) {
        case ActionTypes.NEW_COMMENT_REQUEST:
            return state.set('isFetching', true).set('error', '');
        case ActionTypes.NEW_COMMENT_SUCCESS:
            return Map({
                isFetching: false,
                pid: fromJS(action.json.data.id),
                error: '',
            });
        case ActionTypes.NEW_COMMENT_FAILURE:
            return Map({
                isFetching: false,
                error: action.error,
            });
        default:
            return state;
    }
};

export default newComment;
