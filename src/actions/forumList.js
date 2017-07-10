import { CALL_API } from '../middlewares/callApi';

export const GET_FORUMLIST_REQUEST = 'GET_FORUMLIST_REQUEST';
export const GET_FORUMLIST_SUCCESS = 'GET_FORUMLIST_SUCCESS';
export const GET_FORUMLIST_FAILURE = 'GET_FORUMLIST_FAILURE';

const fetchForumList = () => ({
    [CALL_API]: {
        types: [GET_FORUMLIST_REQUEST, GET_FORUMLIST_SUCCESS, GET_FORUMLIST_FAILURE],
        apiPath: 'forum'
    }
});

export const getForumList = () => (dispatch, getState) => {
    const forumList = getState().get('forumList');
    if (forumList.get('items').length || forumList.get('isFetching')) {
        return null;
    }
    return dispatch(fetchForumList());
};
