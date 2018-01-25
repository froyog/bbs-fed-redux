import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../../actions/common/toast';

const toast = (state = fromJS({
    isShow: false,
    message: ''
}), action) => {
    switch (action.type) {
        case ActionTypes.SHOW_TOAST:
            return Map({
                isShow: true,
                message: action.message
            });
        case ActionTypes.HIDE_TOAST:
            return state.set('isShow', false);
        default:
            return state;
    }
};

export default toast;