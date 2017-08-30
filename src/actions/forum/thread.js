import { CALL_API } from '../../middlewares/callApi';


// call thread/:tid to get everything on a thread page
export const GET_THREAD_REQUEST = 'GET_THREAD_REQUEST';
export const GET_THREAD_SUCCESS = 'GET_THREAD_SUCCESS';
export const GET_THREAD_FAILURE = 'GET_THREAD_FAILURE';

const fetchThreadPage = (tid, page) => ({
    [CALL_API]: {
        types: [GET_THREAD_REQUEST, GET_THREAD_SUCCESS, GET_THREAD_FAILURE],
        apiPath: `thread/${tid}/page/${page - 1}`
    },
    tid: tid,
    page: page
});

const shouldFetchThreadPage = (threadNode, tid, page) => {
    if (!threadNode) {
        // doesn't exist
        return true;
    }
    if (threadNode.get('isFetching')) {
        return false;
    } else if (threadNode.get('tid') === tid) {
        // cached
        return false;
    }
    return true;
};

// Fetch thread page if needed, check page and thread id respectively to
// decide whether the request page is already cached.
// Keep it in your mind that we only cache pages, not threads.
export const getThreadPage = (tid, page) => (dispatch, getState) => {
    const threadNode = getState().getIn(['thread', page]);
    if (shouldFetchThreadPage(threadNode, tid, page)) {
        dispatch(fetchThreadPage(tid, page));
    }
};
