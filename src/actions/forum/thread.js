import { CALL_API } from '../../middlewares/callApi';
import { parseUser } from '../../util';


// call thread/:tid to get everything on a thread page
export const GET_THREAD_REQUEST = 'GET_THREAD_REQUEST';
export const GET_THREAD_SUCCESS = 'GET_THREAD_SUCCESS';
export const GET_THREAD_FAILURE = 'GET_THREAD_FAILURE';
export const INVAILDATE_THREAD_PAGE = 'INVAILDATE_THREAD_PAGE';


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
// cache pages only, not threads.
export const getThreadPage = (tid, page) => (dispatch, getState) => {
    const threadNode = getState().getIn(['thread', page]);
    if (shouldFetchThreadPage(threadNode, tid, page)) {
        const authentication = parseUser(getState());
        dispatch({
            [CALL_API]: {
                types: [GET_THREAD_REQUEST, GET_THREAD_SUCCESS, GET_THREAD_FAILURE],
                apiPath: `thread/${tid}/page/${page - 1}`,
                request: {
                    headers: {
                        auth: authentication
                    }
                }
            },
            tid: tid,
            page: page
        });
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

export const fetchNewComment = (tid, content, anonymous, replyId) => (dispatch, getState) => {
    const authentication = parseUser(getState());
    let body = {
        content,
        anonymous: Number(anonymous)
    };
    if (replyId) {
        body.reply = replyId;
    }
    dispatch({
        [CALL_API]: {
            types: [NEW_COMMENT_REQUEST, NEW_COMMENT_SUCCESS, NEW_COMMENT_FAILURE],
            apiPath: `thread/${tid}`,
            request: {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    contentType: 'application/json',
                    auth: authentication
                }
            }
        }
    });
};

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const deletePost = pid => (dispatch, getState) => {
    const authentication = parseUser(getState());
    dispatch({
        [CALL_API]: {
            types: [DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE],
            apiPath: `post/${pid}`,
            request: {
                method: 'DELETE',
                headers: {
                    auth: authentication
                }
            }
        }
    });
};