import { CALL_API } from '../../middlewares/callApi';
import { parseUser } from '../../util';


// call thread/:tid to get everything on a thread page
export const GET_THREAD_REQUEST = 'GET_THREAD_REQUEST';
export const GET_THREAD_SUCCESS = 'GET_THREAD_SUCCESS';
export const GET_THREAD_FAILURE = 'GET_THREAD_FAILURE';
export const INVAILDATE_THREAD_PAGE = 'INVAILDATE_THREAD_PAGE';

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
    } else if (threadNode.get('didInvaildate')) {
        return true;
    }
    // check if cached 
    return threadNode.get('tid') !== tid;
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

export const refreshThread = page => dispatch => {
    return dispatch({ 
        type: INVAILDATE_THREAD_PAGE,
        page: page
    });
};

export const NEW_COMMENT_REQUEST = 'NEW_COMMENT_REQUEST';
export const NEW_COMMENT_SUCCESS = 'NEW_COMMENT_SUCCESS';
export const NEW_COMMENT_FAILURE = 'NEW_COMMENT_FAILURE';

export const fetchNewComment = (tid, content) => (dispatch, getState) => {
    const authentication = parseUser(getState());
    dispatch({
        [CALL_API]: {
            types: [NEW_COMMENT_REQUEST, NEW_COMMENT_SUCCESS, NEW_COMMENT_FAILURE],
            apiPath: `thread/${tid}`,
            request: {
                method: 'POST',
                body: JSON.stringify({content}),
                headers: {
                    contentType: 'application/json',
                    auth: authentication
                }
            }
        }
    });
};
