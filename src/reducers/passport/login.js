import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../../actions/passport/login';


const defaultState = fromJS({
    'isFetching': false,
    'error': ''
});

const Login = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.LOGIN_SUCCESS:
            return Map({
                'isFetching': false,
                'error': ''
            });
        case ActionTypes.LOGIN_FAILURE:
            return Map({
                'isFetching': false,
                'error': fromJS(action.error)
            });
        default:
            return state;
    }
};

export default Login;
