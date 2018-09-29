import { CALL_API } from '../middlewares/callApi';
import { parseUser } from '../util';

// Get forum list start here.
export const GET_FORUMLIST_REQUEST = 'GET_FORUMLIST_REQUEST';
export const GET_FORUMLIST_SUCCESS = 'GET_FORUMLIST_SUCCESS';
export const GET_FORUMLIST_FAILURE = 'GET_FORUMLIST_FAILURE';

// Fetch forum list relies on callApi middleware.
const fetchForumList = () => ({
    [CALL_API]: {
        types: [GET_FORUMLIST_REQUEST, GET_FORUMLIST_SUCCESS, GET_FORUMLIST_FAILURE],
        apiPath: 'forum',
    },
});

// Fetch forum list unless it is currently cashed.
// Relies on redux-thunk middleware
export const getForumList = () => (dispatch, getState) => {
    const forumList = getState().get('forumList');
    if (forumList.get('items').size || forumList.get('isFetching')) {
        return null;
    }
    return dispatch(fetchForumList());
};

// Get board list given a forum ID
// Logic is the same above
export const GET_BOARDLIST_REQUEST = 'GET_BOARDLIST_REQUEST';
export const GET_BOARDLIST_SUCCESS = 'GET_BOARDLIST_SUCCESS';
export const GET_BOARDLIST_FAILURE = 'GET_BOARDLIST_FAILURE';

export const getBoardList = fid => (dispatch, getState) => {
    const boardListByFid = getState().getIn(['boardList', fid]);
    if (boardListByFid) {
        return null;
    }

    const authentication = parseUser(getState());
    return dispatch({
        [CALL_API]: {
            types: [GET_BOARDLIST_REQUEST, GET_BOARDLIST_SUCCESS, GET_BOARDLIST_FAILURE],
            apiPath: `forum/${fid}`,
            request: {
                headers: {
                    auth: authentication,
                },
            },
        },
        fid: fid,
    });
};
