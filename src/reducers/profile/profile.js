import { Map, fromJS } from 'immutable';
import * as ActionTypes from '../../actions/profile/profile';


const profiles = (state = fromJS({
    isFetching: false,
    profile: {},
    error: ''
}), action) => {
    switch (action.type) {
        case ActionTypes.GET_PROFILE_REQUEST:
        case ActionTypes.GET_MYSELF_PROFILE_REQUEST:
            return state.set('isFetching', true).set('error', '');
        case ActionTypes.GET_PROFILE_SUCCESS:
        case ActionTypes.GET_MYSELF_PROFILE_SUCCESS:
            return Map({
                'isFetching': false,
                'profile': fromJS(action.json.data),
                'error': ''
            });
        case ActionTypes.GET_PROFILE_FAILURE:
        case ActionTypes.GET_MYSELF_PROFILE_FAILURE:
            return state.set('isFetching', false).set('error', fromJS(action.error));
        default:
            return state;
    }
};

const profilesByUid = (state = Map(), action) => {
    switch (action.type) {
        case ActionTypes.GET_PROFILE_REQUEST:
        case ActionTypes.GET_MYSELF_PROFILE_REQUEST:
        case ActionTypes.GET_PROFILE_SUCCESS:
        case ActionTypes.GET_MYSELF_PROFILE_SUCCESS:
        case ActionTypes.GET_PROFILE_FAILURE:
        case ActionTypes.GET_MYSELF_PROFILE_FAILURE:
            return state.set(
                action.uid, profiles(state.get(action.uid), action)
            );
        default:
            return state;
    }
};

export default profilesByUid;