import * as ActionTypes from '../../actions/frame/redirect';


const redirect = (state = '', action) => {
    switch (action.type) {
        case ActionTypes.SET_REFER_URL:
            return action.url;
        default:
            return state;
    }
};

export default redirect;
