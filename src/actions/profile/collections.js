import { CALL_API } from '../../middlewares/callApi';
import { parseUser } from '../../util';

export const GET_COLLECTIONS_REQUEST = 'GET_COLLECTIONS_REQUEST';
export const GET_COLLECTIONS_SUCCESS = 'GET_COLLECTIONS_SUCCESS';
export const GET_COLLECTIONS_FAILURE = 'GET_COLLECTIONS_FAILURE';

export const GET_FOLLOWINGS_REQUEST = 'GET_FOLLOWINGS_REQUEST';
export const GET_FOLLOWINGS_SUCCESS = 'GET_FOLLOWINGS_SUCCESS';
export const GET_FOLLOWINGS_FAILURE = 'GET_FOLLOWINGS_FAILURE';

const createCollectionAction = ({ sliceReducerName, types, apiPath }) => {
    return () => (dispatch, getState) => {
        const authenication = parseUser(getState());
        if (!getState().getIn(['bypassing', sliceReducerName, 'items'])) {
            return dispatch({
                [CALL_API]: {
                    types: types,
                    apiPath: apiPath,
                    request: {
                        method: 'GET',
                        headers: {
                            auth: authenication
                        }
                    }
                }
            });
        }
    };
};

export const getCollectionsIfNeeded = createCollectionAction({
    sliceReducerName: 'collections',
    types: [GET_COLLECTIONS_REQUEST, GET_COLLECTIONS_SUCCESS, GET_COLLECTIONS_FAILURE],
    apiPath: 'home/collection'
});

export const getFollowingsIfNeeded = createCollectionAction({
    sliceReducerName: 'followings',
    types: [GET_FOLLOWINGS_REQUEST, GET_FOLLOWINGS_SUCCESS, GET_FOLLOWINGS_FAILURE],
    apiPath: 'home/follow'
});

export const DELETE_COLLECTION_REQUEST = 'DELETE_COLLECTION_REQUEST';
export const DELETE_COLLECTION_SUCCESS = 'DELETE_COLLECTION_SUCCESS';
export const DELETE_COLLECTION_FAILURE = 'DELETE_COLLECTION_FAILURE';

export const DELETE_FOLLOWING_REQUEST = 'DELETE_FOLLOWING_REQUEST';
export const DELETE_FOLLOWING_SUCCESS = 'DELETE_FOLLOWING_SUCCESS';
export const DELETE_FOLLOWING_FAILURE = 'DELETE_FOLLOWING_FAILURE';

export const deleteCollection = tid => (dispatch, getState) => {
    const authenication = parseUser(getState());
    return dispatch({
        [CALL_API]: {
            types: [DELETE_COLLECTION_REQUEST, DELETE_COLLECTION_SUCCESS, DELETE_COLLECTION_FAILURE],
            apiPath: `home/collection/${tid}`,
            request: {
                method: 'DELETE',
                headers: {
                    auth: authenication
                }
            }
        }
    });
};

export const deleteFollowing = bid => (dispatch, getState) => {
    const authenication = parseUser(getState());
    return dispatch({
        [CALL_API]: {
            types: [DELETE_FOLLOWING_REQUEST, DELETE_COLLECTION_SUCCESS, DELETE_COLLECTION_FAILURE],
            apiPath: `home/follow/${bid}`,
            request: {
                method: 'DELETE',
                headers: {
                    auth: authenication
                }
            }
        }
    });
};

