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