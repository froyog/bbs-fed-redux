import { CALL_API } from '../../middlewares/callApi';

export const SEARCH_USER_REQUEST = 'SEARCH_USER_REQUEST';
export const SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS';
export const SEARCH_USER_FAILURE = 'SEARCH_USER_FAILURE';

export const searchUser = keyword => dispatch => {
    dispatch({
        [CALL_API]: {
            types: [SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, SEARCH_USER_FAILURE],
            apiPath: `search/user/${keyword}`
        }
    });
};

export const SEARCH_THREAD_REQUEST = 'SEARCH_THREAD_REQUEST';
export const SEARCH_THREAD_SUCCESS = 'SEARCH_THREAD_SUCCESS';
export const SEARCH_THREAD_FAILURE = 'SEARCH_THREAD_FAILURE';

export const searchThread = (keyword, page) => dispatch => {
    dispatch({
        [CALL_API]: {
            types: [SEARCH_THREAD_REQUEST, SEARCH_THREAD_SUCCESS, SEARCH_THREAD_FAILURE],
            apiPath: `search/page/${page-1}?keyword=${keyword}`
        }
    })
}