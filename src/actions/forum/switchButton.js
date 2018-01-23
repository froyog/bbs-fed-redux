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