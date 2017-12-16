import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../actions/bbsIndex';

const topTenDefaultState = fromJS({
    isFetching: false,
    items: [],
    error: ''
});

const topTen = (state = topTenDefaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_TOPTEN_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.GET_TOPTEN_SUCCESS:
            return Map({
                'isFetching': false,
                'items': fromJS(action.json.data),
                'error': ''
            });
        case ActionTypes.GET_TOPTEN_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error)
            });
        default:
            return state;
    }
};


const latest = (state = fromJS({
    isFetching: false,
    didInvaildate: false,
    items: [],
    error: ''
}), action) => {
    switch (action.type) {
        case ActionTypes.GET_LATEST_REQUEST:
            return state
                .set('isFetching', true)
                .set('error', '');
        case ActionTypes.GET_LATEST_SUCCESS:
            const incomingItems = fromJS(action.json.data);
            const finalItems = action.page === 0
                ? incomingItems
                : incomingItems.concat(state.get('items'));
            return Map({
                'isFetching': false,
                'didInvalidate': false,
                'items': finalItems,
                'error': ''
            });
        case ActionTypes.GET_LATEST_FAILURE:
            return Map({
                'isFetching': false,
                'didInvaildate': false,
                'error': fromJS(action.error)
            });
        case ActionTypes.INVAILDATE_LATEST:
            return state.set('didInvaildate', true);
        default:
            return state;
    }
};

const announce = (state = fromJS({
    isFetching: false,
    announcements: [],
    error: ''
}), action) => {
    switch (action.type) {
        case ActionTypes.GET_ANNOUNCE_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.GET_ANNOUNCE_SUCCESS:
            return Map({
                isFetching: false,
                announcements: fromJS(action.json.data),
                error: ''
            });
        case ActionTypes.GET_ANNOUNCE_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.error);
        default: 
            return state;
    }
};

const adsCarousel = (state = fromJS({
    isFetching: false,
    adList: [],
    error: ''
}), action) => {
    switch (action.type) {
        case ActionTypes.GET_ADS_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.GET_ADS_SUCCESS:
            return Map({
                isFetching: false,
                adList: fromJS(action.json.data),
                error: ''
            });
        case ActionTypes.GET_ADS_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.error);
        default:
            return state;
    }
};

const indexRank = (state = fromJS({
    isFetching: false,
    rankData: [],
    error: ''
}), action) => {
    switch (action.type) {
        case ActionTypes.GET_INDEX_RANK_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.GET_INDEX_RANK_SUCCESS:
            return Map({
                isFetching: false,
                rankData: fromJS(action.json.data),
                error: ''
            });
        case ActionTypes.GET_INDEX_RANK_FAILURE:
            return state
                .set('isFetching', false)
                .set('error', action.error);
        default:
            return state;
    }
};

const bbsIndex = (state = Map(), action) => {
    switch (action.type) {
        case ActionTypes.GET_TOPTEN_REQUEST:
        case ActionTypes.GET_TOPTEN_SUCCESS:
        case ActionTypes.GET_TOPTEN_FAILURE:
            return state.set(
                'topTen', topTen(state.get('topTen'), action)
            );
        case ActionTypes.GET_LATEST_REQUEST:
        case ActionTypes.GET_LATEST_SUCCESS:
        case ActionTypes.GET_LATEST_FAILURE:
        case ActionTypes.INVAILDATE_LATEST:
            return state.set(
                'latest', latest(state.get('latest'), action)
            );
        case ActionTypes.GET_ANNOUNCE_REQUEST:
        case ActionTypes.GET_ANNOUNCE_SUCCESS:
        case ActionTypes.GET_ANNOUNCE_FAILURE:
            return state.set(
                'announce', announce(state.get('announce'), action)
            );
        case ActionTypes.GET_ADS_REQUEST:
        case ActionTypes.GET_ADS_SUCCESS:
        case ActionTypes.GET_ADS_FAILURE:
            return state.set(
                'ads', adsCarousel(state.get('ads'), action)
            );
        case ActionTypes.GET_INDEX_RANK_REQUEST:
        case ActionTypes.GET_INDEX_RANK_SUCCESS:
        case ActionTypes.GET_INDEX_RANK_FAILURE:
            return state.set(
                'rank', indexRank(state.get('rank'), action)
            );
        default:
            return state;
    }
};

export default bbsIndex;
