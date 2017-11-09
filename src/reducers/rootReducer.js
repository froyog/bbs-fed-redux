import { combineReducers } from 'redux-immutable';
import { fromJS, Map } from 'immutable';
import forumList from './forum/forumList';
import boardList from './forum/boardList';
import board from './forum/board';
import sidebar from './frame/sidebar';
import bbsIndex from './bbsIndex';
import auth from '../alpha/reducer/auth';
import login from './passport/login';
import thread from './forum/thread';
import newThread from './forum/newThread';
import attach from './forum/attach';
import newComment from './forum/newComment';
import searchUser from './common/searchUser';
import errorModal from './common/errorModal';

// TODO: need refactoring
// const rootReducer = combineReducers({
// });
    
const combinedReducer = combineReducers({
    sidebarIsOpen: sidebar,
    forumList,
    boardList,
    board,
    bbsIndex,
    auth,
    login,
    thread,
    newThread,
    newComment,
    attach,
    searchUser,
    errorModalIsShow: errorModal,
    user: (state=Map()) => state
});

const crossSliceReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return state.set('user', fromJS(action.json.data));
        default:
            return state;
    }
};

const rootReducer = (state, action) => {
    const intermediateState = combinedReducer(state, action);
    const finalState = crossSliceReducer(intermediateState, action);
    return finalState;
};

export default rootReducer;
