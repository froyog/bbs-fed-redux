import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../../actions/rank/rank';


const rankByType = types => {
    const [requestType, successType, failureType] = types;
    return (state = fromJS({
        isFetching: false,
        rankList: [],
        error: ''
    }), action) => {
        switch (action.type) {
            case requestType:
                return state.set('isFetching', true);
            case successType:
                return Map({
                    isFetching: false,
                    rankList: fromJS(action.json.data),
                    error: ''
                });
            case failureType:
                return state
                    .set('isFetching', false)
                    .set('error', action.error);
            default:
                return state;
        }
    };
};

const rank = (state = Map(), action) => {
    switch (action.type) {
        case ActionTypes.GET_WEEK_RANK_REQUEST:
        case ActionTypes.GET_WEEK_RANK_SUCCESS:
        case ActionTypes.GET_WEEK_RANK_FAILURE:
            return state.set(
                'week', rankByType([
                    ActionTypes.GET_WEEK_RANK_REQUEST,
                    ActionTypes.GET_WEEK_RANK_SUCCESS,
                    ActionTypes.GET_WEEK_RANK_FAILURE
                ])(state.get('week'), action)
            );
        case ActionTypes.GET_MONTH_RANK_REQUEST:
        case ActionTypes.GET_MONTH_RANK_SUCCESS:
        case ActionTypes.GET_MONTH_RANK_FAILURE:
            return state.set(
                'month', rankByType([
                    ActionTypes.GET_MONTH_RANK_REQUEST,
                    ActionTypes.GET_MONTH_RANK_SUCCESS,
                    ActionTypes.GET_MONTH_RANK_FAILURE
                ])(state.get('month'), action)
            );
        default:
            return state;
    }
};

export default rank;