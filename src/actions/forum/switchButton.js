import { CALL_API } from '../../middlewares/callApi';
import { parseUser } from '../../util';

export const FOLLOW_BOARD_REQUEST = 'FOLLOW_BOARD_REQUEST';
export const FOLLOW_BOARD_SUCCESS = 'FOLLOW_BOARD_SUCCESS';
export const FOLLOW_BOARD_FAILURE = 'FOLLOW_BOARD_FAILURE';
export const UNFOLLOW_BOARD_REQUEST = 'UNFOLLOW_BOARD_REQUEST';
export const UNFOLLOW_BOARD_SUCCESS = 'UNFOLLOW_BOARD_SUCCESS';
export const UNFOLLOW_BOARD_FAILURE = 'UNFOLLOW_BOARD_FAILURE';

export const COLLECT_THREAD_REQUEST = 'COLLECT_THREAD_REQUEST';
export const COLLECT_THREAD_SUCCESS = 'COLLECT_THREAD_SUCCESS';
export const COLLECT_THREAD_FAILURE = 'COLLECT_THREAD_FAILURE';
export const UNCOLLECT_THREAD_REQUEST = 'UNCOLLECT_THREAD_REQUEST';
export const UNCOLLECT_THREAD_SUCCESS = 'UNCOLLECT_THREAD_SUCCESS';
export const UNCOLLECT_THREAD_FAILURE = 'UNCOLLECT_THREAD_FAILURE';

const followAndCollectAction = ({activeTypes, unactiveTypes, apiPath, idType}) => {
    return (id, nextState) => (dispatch, getState) => {
        const authentication = parseUser(getState());
        if (nextState) {
            // active
            return dispatch({
                [CALL_API]: {
                    types: activeTypes,
                    apiPath: apiPath,
                    request: {
                        method: 'POST',
                        body: JSON.stringify({
                            [idType]: id
                        }),
                        headers: {
                            contentType: 'application/json',
                            auth: authentication
                        }
                    }
                }
            });
        } else {
            // unactive
            return dispatch({
                [CALL_API]: {
                    types: unactiveTypes,
                    apiPath: `${apiPath}/${id}`,
                    request: {
                        method: 'DELETE',
                        headers: {
                            auth: authentication
                        }
                    }
                }
            });
        }
    };
};

export const followBoard = followAndCollectAction({
    activeTypes: [FOLLOW_BOARD_REQUEST, FOLLOW_BOARD_SUCCESS, FOLLOW_BOARD_FAILURE],
    unactiveTypes: [UNFOLLOW_BOARD_REQUEST, UNFOLLOW_BOARD_SUCCESS, UNFOLLOW_BOARD_FAILURE],
    apiPath: 'home/follow',
    idType: 'bid'
});
export const collectThread = followAndCollectAction({
    activeTypes: [COLLECT_THREAD_REQUEST, COLLECT_THREAD_SUCCESS, COLLECT_THREAD_FAILURE],
    unactiveTypes: [UNCOLLECT_THREAD_REQUEST, UNCOLLECT_THREAD_SUCCESS, UNCOLLECT_THREAD_FAILURE],
    apiPath: 'home/collection',
    idType: 'tid'
});


export const LIKE_THREAD_REQUEST = 'LIKE_THREAD_REQUEST';
export const LIKE_THREAD_SUCCESS = 'LIKE_THREAD_SUCCESS';
export const LIKE_THREAD_FAILURE = 'LIKE_THREAD_FAILURE';

export const UNLIKE_THREAD_REQUEST = 'UNLIKE_THREAD_REQUEST';
export const UNLIKE_THREAD_SUCCESS = 'UNLIKE_THREAD_SUCCESS';
export const UNLIKE_THREAD_FAILURE = 'UNLIKE_THREAD_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';


export const likeThread = (tid, nextState) => (dispatch, getState) => {
    const authentication = parseUser(getState());
    return dispatch({
        [CALL_API]: {
            types: (
                nextState 
                    ? [LIKE_THREAD_REQUEST, LIKE_THREAD_SUCCESS, LIKE_THREAD_FAILURE]
                    : [UNLIKE_THREAD_REQUEST, UNLIKE_THREAD_SUCCESS, UNLIKE_THREAD_FAILURE]
            ),
            apiPath: `thread/${tid}/like`,
            request: {
                method: nextState ? 'PUT' : 'DELETE',
                headers: {
                    auth: authentication
                }
            }
        }
    });
};

export const likePost = (pid, nextState) => (dispatch, getState) => {
    const authentication = parseUser(getState());
    return dispatch({
        [CALL_API]: {
            types: (
                nextState 
                    ? [LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE]
                    : [UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE]
            ),
            apiPath: `post/${pid}/like`,
            request: {
                method: nextState ? 'PUT' : 'DELETE',
                headers: {
                    auth: authentication
                }
            }
        },
        requestId: pid
    });
};

export const LOCK_THREAD_REQUEST = 'LOCK_THREAD_REQUEST';
export const LOCK_THREAD_SUCCESS = 'LOCK_THREAD_SUCCESS';
export const LOCK_THREAD_FAILURE = 'LOCK_THREAD_FAILURE';
export const UNLOCK_THREAD_REQUEST = 'UNLOCK_THREAD_REQUEST';
export const UNLOCK_THREAD_SUCCESS = 'UNLOCK_THREAD_SUCCESS';
export const UNLOCK_THREAD_FAILURE = 'UNLOCK_THREAD_FAILURE';


    
      

export const lockThread = (tid, nextState) => (dispatch, getState) => {
    const authentication = parseUser(getState());
    return dispatch({
        [CALL_API]: {
            types: (
                nextState 
                    ? [LOCK_THREAD_REQUEST, LOCK_THREAD_SUCCESS, LOCK_THREAD_FAILURE]
                    : [UNLOCK_THREAD_REQUEST, UNLOCK_THREAD_SUCCESS, UNLOCK_THREAD_FAILURE]
            ),
            
            apiPath: `thread/${tid}/lock`,
            request: {
                method: nextState ? 'PUT' : 'DELETE',
                headers: {
                    auth: authentication
                }
            }
        }
    });
    
};