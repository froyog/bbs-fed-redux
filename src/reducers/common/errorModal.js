import * as ActionTypes from '../../actions/common/error-portal';

const errorModal = (state = false, action) => {
    switch (action.type) {
        case ActionTypes.SHOW_ERROR_MODAL:
            return true;
        case ActionTypes.HIDE_ERROR_MODAL:
            return false;
        default:
            return state;
    }
};

export default errorModal;