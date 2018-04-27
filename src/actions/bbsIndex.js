import { CALL_API } from '../middlewares/callApi';
import { parseUser } from '../../util';

// Get top ten threads for index
export const GET_TOPTEN_REQUEST = 'GET_TOPTEN_REQUEST';
export const GET_TOPTEN_SUCCESS = 'GET_TOPTEN_SUCCESS';
export const GET_TOPTEN_FAILURE = 'GET_TOPTEN_FAILURE';

// Fetch request depends on cache
export const getTopTen = () => (dispatch, getState) => {
    const topTen = getState().getIn(['bbsIndex', 'topTen']);
    
    if (topTen) {
        return null;
    }
    
    const authentication = parseUser(getState());
    return dispatch({
        [CALL_API]: {
            types: [GET_TOPTEN_REQUEST, GET_TOPTEN_SUCCESS, GET_TOPTEN_FAILURE],
            apiPath: 'index/hot',
            request: {
                headers: {
                    auth: authentication
                }
            }
        }
    });
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
        const authentication = parseUser(getState());
        return dispatch({
            [CALL_API]: {
                types: [GET_LATEST_REQUEST, GET_LATEST_SUCCESS, GET_LATEST_FAILURE],
                apiPath: `index/latest?p=${page}`,
                request: {
                    headers: {
                        auth: authentication
                    }
                }
            },
            page: page
        });
    }
};

export const refreshLatest = () => dispatch => {
    return dispatch({ type: INVAILDATE_LATEST });
};


export const GET_ANNOUNCE_REQUEST = 'GET_ANNOUNCE_REQUEST';
export const GET_ANNOUNCE_SUCCESS = 'GET_ANNOUNCE_SUCCESS';
export const GET_ANNOUNCE_FAILURE = 'GET_ANNOUNCE_FAILURE';

export const getAnnouncements = () => (dispatch, getState) => {
    const announcementsState = getState().getIn(['bbsIndex', 'announce']);
    if (announcementsState && announcementsState.get('announcements').size) {
        return null;
    }
    return dispatch({
        [CALL_API]: {
            types: [GET_ANNOUNCE_REQUEST, GET_ANNOUNCE_SUCCESS, GET_ANNOUNCE_FAILURE],
            apiPath: 'index/announce'
        }
    });
};

export const GET_ADS_REQUEST = 'GET_ADS_REQUEST';
export const GET_ADS_SUCCESS = 'GET_ADS_SUCCESS';
export const GET_ADS_FAILURE = 'GET_ADS_FAILURE';

export const getAdsIfNeeded = () => (dispatch, getState) => {
    const adsState = getState().getIn(['bbsIndex', 'ads']);
    if (adsState && adsState.get('adList').size) {
        return;
    }
    return dispatch({
        [CALL_API]: {
            types: [GET_ADS_REQUEST, GET_ADS_SUCCESS, GET_ADS_FAILURE],
            apiPath: 'index/ads'
        }
    });
};

export const GET_INDEX_RANK_REQUEST = 'GET_INDEX_RANK_REQUEST';
export const GET_INDEX_RANK_SUCCESS = 'GET_INDEX_RANK_SUCCESS';
export const GET_INDEX_RANK_FAILURE = 'GET_INDEX_RANK_FAILURE';

export const getIndexRankIfNeeded = () => (dispatch, getState) => {
    const indexRankState = getState().getIn(['bbsIndex', 'rank']);
    if (indexRankState && indexRankState.get('rankData').size) {
        return;
    }

    return dispatch({
        [CALL_API]: {
            types: [GET_INDEX_RANK_REQUEST, GET_INDEX_RANK_SUCCESS, GET_INDEX_RANK_FAILURE],
            apiPath: 'index/rank'
        }
    });
};