import { CALL_API } from '../../middlewares/callApi';
import { parseUser } from '../../util';

export const GET_PUBLISH_REQUEST = 'GET_PUBLISH_REQUEST';
export const GET_PUBLISH_SUCCESS = 'GET_PUBLISH_SUCCESS';
export const GET_PUBLISH_FAILURE = 'GET_PUBLISH_FAILURE';

export const GET_REPLY_REQUEST = 'GET_REPLY_REQUEST';
export const GET_REPLY_SUCCESS = 'GET_REPLY_SUCCESS';
export const GET_REPLY_FAILURE = 'GET_REPLY_FAILURE';

const createPublishAction = ({ types, apiPath }) => {
    return page => (dispatch, getState) => {
        const authenication = parseUser(getState());
        return dispatch({
            [CALL_API]: {
                types: types,
                apiPath: apiPath + `/page/${page}`,
                request: {
                    method: 'GET',
                    headers: {
                        auth: authenication,
                    },
                },
            },
            page: page,
        });
    };
};

export const getPublishList = createPublishAction({
    types: [GET_PUBLISH_REQUEST, GET_PUBLISH_SUCCESS, GET_PUBLISH_FAILURE],
    apiPath: 'home/publish/thread',
});
export const getReplyList = createPublishAction({
    types: [GET_REPLY_REQUEST, GET_REPLY_SUCCESS, GET_REPLY_FAILURE],
    apiPath: 'home/publish/post',
});
