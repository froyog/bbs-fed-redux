import * as ActionTypes from '../../actions/frame/sidebar';

const sidebar = (state = false, action) => {
    switch (action.type) {
        case ActionTypes.TOGGLE_SIDEBAR:
            return action.isOpen;
        default:
            return state;
    }
};

export default sidebar;
