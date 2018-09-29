import { CALL_API } from '../../middlewares/callApi';

export const GET_WEEK_RANK_REQUEST = 'GET_WEEK_RANK_REQUEST';
export const GET_WEEK_RANK_SUCCESS = 'GET_WEEK_RANK_SUCCESS';
export const GET_WEEK_RANK_FAILURE = 'GET_WEEK_RANK_FAILURE';

export const GET_MONTH_RANK_REQUEST = 'GET_MONTH_RANK_REQUEST';
export const GET_MONTH_RANK_SUCCESS = 'GET_MONTH_RANK_SUCCESS';
export const GET_MONTH_RANK_FAILURE = 'GET_MONTH_RANK_FAILURE';

export const getCompleteRank = type => (dispatch, getState) => {
    const rankStateByType = getState().getIn(['rank', type]);
    if (rankStateByType) return;

    let types;
    const currentTimestamp = Math.floor(new Date().getTime() / 1000);

    if (type === 'week') {
        types = [GET_WEEK_RANK_REQUEST, GET_WEEK_RANK_SUCCESS, GET_WEEK_RANK_FAILURE];
    } else if (type === 'month') {
        types = [GET_MONTH_RANK_REQUEST, GET_MONTH_RANK_SUCCESS, GET_MONTH_RANK_FAILURE];
    }

    return dispatch({
        [CALL_API]: {
            types: types,
            apiPath: `rank/${type}?t=${currentTimestamp}`,
        },
    });
};
