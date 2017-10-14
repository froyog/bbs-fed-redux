import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../../actions/forum/thread';

const thread = (state = fromJS({
    isFetching: false,
    tid: 0,
    threadInfo: {},
    postList: []
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
            'postList': fromJS(data.post)
        });
    case ActionTypes.GET_THREAD_FAILURE:
        return Map({
            'isFetching': false,
            'error': fromJS(action.error)
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
        return state.set(
            action.page, thread(state.get(action['page']), action)
        );
    default:
        return state;
    }
};

export default threadByPage;
