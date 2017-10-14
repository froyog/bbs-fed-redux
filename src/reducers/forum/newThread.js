import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../../actions/forum/board';


const newThread = (state = fromJS({
    isFetching: false,
    success: false,
    error: ''
}), action) => {
    switch (action.type) {
    case ActionTypes.NEW_THREAD_REQUEST:
        return state.set('isFetching', true);
    case ActionTypes.NEW_THREAD_SUCCESS:
        return Map({
            'isFetching': true,
            'success': true,
            'error': ''
        });
    case ActionTypes.NEW_THREAD_FAILURE:
        return Map({
            'isFetching': false,
            'success': false,
            'error': action.error
        });
    default:
        return state;
    }
};

export default newThread;
