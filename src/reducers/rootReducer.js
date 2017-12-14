import { combineReducers } from 'redux-immutable';
import { fromJS, Map } from 'immutable';
import forumList from './forum/forumList';
import boardList from './forum/boardList';
import board from './forum/board';
import sidebar from './frame/sidebar';
import bbsIndex from './bbsIndex';
import login from './passport/login';
import thread from './forum/thread';
import newThread from './forum/newThread';
import attach from './forum/attach';
import newComment from './forum/newComment';
import searchUser from './common/searchUser';
import errorModal from './common/errorModal';
import profiles from './profile/profile';
import messages from './profile/messages';
import bypassingFactory from './bypassing';
import publish from './profile/publish';

import { SEND_PRIVATE_REQUEST, SEND_PRIVATE_SUCCESS, SEND_PRIVATE_FAILURE,
    GET_DIALOG_REQUEST, GET_DIALOG_SUCCESS, GET_DIALOG_FAILURE } from '../actions/profile/messages';
import { GET_UNREAD_REQUEST, GET_UNREAD_SUCCESS, GET_UNREAD_FAILURE } from '../actions/frame/sidebar';
import { GET_COLLECTIONS_REQUEST, GET_COLLECTIONS_SUCCESS, GET_COLLECTIONS_FAILURE,
    GET_FOLLOWINGS_REQUEST, GET_FOLLOWINGS_SUCCESS, GET_FOLLOWINGS_FAILURE } from '../actions/profile/collections';
import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from '../actions/passport/log-io';

const bypassing = combineReducers({
    sendPrivateMessage: bypassingFactory({
        types: [SEND_PRIVATE_REQUEST, SEND_PRIVATE_SUCCESS, SEND_PRIVATE_FAILURE],
        mapActionToKey: action => action.targetUid
    }),
    dialogWith: bypassingFactory({
        types: [GET_DIALOG_REQUEST, GET_DIALOG_SUCCESS, GET_DIALOG_FAILURE],
        mapActionToKey: action => action.withUid
    }),
    unreadMessage: bypassingFactory({ types: [GET_UNREAD_REQUEST, GET_UNREAD_SUCCESS, GET_UNREAD_FAILURE] }),
    collections: bypassingFactory({ types: [GET_COLLECTIONS_REQUEST, GET_COLLECTIONS_SUCCESS, GET_COLLECTIONS_FAILURE] }),
    followings: bypassingFactory({ types: [GET_FOLLOWINGS_REQUEST, GET_FOLLOWINGS_SUCCESS, GET_FOLLOWINGS_FAILURE] }),
    logout: bypassingFactory({ types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE] }),
});

const combinedReducer = combineReducers({
    sidebarIsOpen: sidebar,
    forumList,
    boardList,
    board,
    bbsIndex,
    login,
    thread,
    newThread,
    newComment,
    attach,
    searchUser,
    errorModalIsShow: errorModal,
    profiles,
    messages,
    bypassing,
    publish,
    user: (state = Map()) => state
});

const crossSliceReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return state.set('user', fromJS(action.json.data));
        case 'GET_PROFILE_SUCCESS':
            const selfUid = state.getIn(['user', 'uid']);
            return state.setIn(
                ['user', 'username'],
                state.getIn(['profiles', selfUid, 'profile', 'name'])
            );
        case 'INIT':
            return state.set('user', fromJS(action.userFromLocal));
        case 'LOGOUT_SUCCESS':
            return state.set('user', null);
        case 'SEND_READ_SUCCESS':
            return state.setIn(['bypassing', 'unreadMessage', 'items'], 0);
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
