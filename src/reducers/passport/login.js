import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../../actions/passport/log-io';

const defaultState = fromJS({
    isFetching: false,
    success: false,
    error: '',
});

const Login = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.LOGIN_SUCCESS:
            return Map({
                isFetching: false,
                success: true,
                error: '',
            });
        case ActionTypes.LOGIN_FAILURE:
            return Map({
                isFetching: false,
                success: false,
                error: fromJS(action.error),
            });
        default:
            return state;
    }
};

export default Login;
