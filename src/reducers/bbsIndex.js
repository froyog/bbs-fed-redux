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
                'items': fromJS(action.json.data)
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

const latestDefaultState = fromJS({
    isFetching: false,
    didInvaildate: false,
    items: [],
    error: ''
});

const latest = (state = latestDefaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_LATEST_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.GET_LATEST_SUCCESS:
            return Map({
                'isFetching': false,
                'didInvaildate': false,
                'items': fromJS(action.json.data)
            });
        case ActionTypes.GET_LATEST_FAILURE:
            return Map({
                'isFetching': false,
                'didInvaildate': false,
                'error': fromJS(action.json.data)
            });
        case ActionTypes.INVAILDATE_LATEST:
            return state.set('didInvaildate', true);
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
        default:
            return state;
    }
};

export default bbsIndex;