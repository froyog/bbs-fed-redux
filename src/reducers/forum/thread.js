import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../../actions/forum/thread';

const thread = (state = fromJS({
    isFetching: false,
    tid: 0,
    threadInfo: {},
    postList: [],
    didInvaildate: true
}), action) => {
    switch (action.type) {
        case ActionTypes.GET_THREAD_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.GET_THREAD_SUCCESS:
            const data = action.json.data;
            return Map({
                'isFetching': false,
                'tid': action.tid,
                'threadInfo': fromJS(data.thread),
                'boardInfo': fromJS(data.board),
                'postList': fromJS(data.post),
                'didInvaildate': false
            });
        case ActionTypes.GET_THREAD_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error),
                'didInvaildate': false
            });
        case ActionTypes.INVAILDATE_THREAD_PAGE:
            return Map({
                'isFetching': false,
                'didInvaildate': true,
            });
        default:
            return state;
    }
};

// Saved by page, we cache all pages in a single thread
// instead of a lot of threads
const threadByPage = (state = Map(), action) => {
    switch (action.type) {
        case ActionTypes.GET_THREAD_REQUEST:
        case ActionTypes.GET_THREAD_SUCCESS:
        case ActionTypes.GET_THREAD_FAILURE:
        case ActionTypes.INVAILDATE_THREAD_PAGE:
            return state.set(
                action.page, thread(state.get(action['page']), action)
            );
        default:
            return state;
    }
};

export default threadByPage;
