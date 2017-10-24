import { CALL_API } from '../middlewares/callApi';

// Get top ten threads for index
export const GET_TOPTEN_REQUEST = 'GET_TOPTEN_REQUEST';
export const GET_TOPTEN_SUCCESS = 'GET_TOPTEN_SUCCESS';
export const GET_TOPTEN_FAILURE = 'GET_TOPTEN_FAILURE';

// Fetch top ten threads
const fetchTopTen = () => ({
    [CALL_API]: {
        types: [GET_TOPTEN_REQUEST, GET_TOPTEN_SUCCESS, GET_TOPTEN_FAILURE],
        apiPath: 'index/hot'
    }
});

// Fetch request depends on cache
export const getTopTen = () => (dispatch, getState) => {
    const topTen = getState().getIn(['bbsIndex', 'topTen']);
    if (topTen) {
        return null;
    }
    return dispatch(fetchTopTen());
};


// Get latest threads for index
export const GET_LATEST_REQUEST = 'GET_LATEST_REQUEST';
export const GET_LATEST_SUCCESS = 'GET_LATEST_SUCCESS';
export const GET_LATEST_FAILURE = 'GET_LATEST_FAILURE';
export const INVAILDATE_LATEST = 'INVAILDATE_LATEST';

// To judge whether latest threads should be fetched
//     - node not exist => fetch
//     - is fetching => dont't fetch
//     - invaildate => fetch
const shouldFetchLatest = (latestNode) => {
    if (!latestNode) {
        return true;
    } else if (latestNode.get('isFetching')) {
        return false;
    } else {
        return latestNode.get('didInvaildate');
    }
};

// No cache for latest
export const getLatest = page => (dispatch, getState) => {
    if (shouldFetchLatest(getState().get('latest'))) {
        return dispatch({
            [CALL_API]: {
                types: [GET_LATEST_REQUEST, GET_LATEST_SUCCESS, GET_LATEST_FAILURE],
                page: page,
                apiPath: `index/latest?p=${page}`
            }
        });
    }
};

export const refreshLatest = () => dispatch => {
    return dispatch({ type: INVAILDATE_LATEST });
};
