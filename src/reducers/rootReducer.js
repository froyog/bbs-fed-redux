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
import toast from './common/toast';
import profiles from './profile/profile';
import messages from './profile/messages';
import bypassingFactory from './bypassing';
import publish from './profile/publish';
import rank from './rank/rank';
import switchButton from './forum/switchButton';

import { SEND_PRIVATE_REQUEST, SEND_PRIVATE_SUCCESS, SEND_PRIVATE_FAILURE,
    GET_DIALOG_REQUEST, GET_DIALOG_SUCCESS, GET_DIALOG_FAILURE } from '../actions/profile/messages';
import { GET_UNREAD_REQUEST, GET_UNREAD_SUCCESS, GET_UNREAD_FAILURE } from '../actions/frame/sidebar';
import { GET_COLLECTIONS_REQUEST, GET_COLLECTIONS_SUCCESS, GET_COLLECTIONS_FAILURE,
    GET_FOLLOWINGS_REQUEST, GET_FOLLOWINGS_SUCCESS, GET_FOLLOWINGS_FAILURE } from '../actions/profile/collections';
import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from '../actions/passport/log-io';
import { DELETE_THREAD_REQUEST, DELETE_THREAD_SUCCESS, DELETE_THREAD_FAILURE,
    EDIT_THREAD_REQUEST, EDIT_THREAD_SUCCESS, EDIT_THREAD_FAILURE } from '../actions/forum/board';
import { DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE } from '../actions/forum/thread';
import { NEW_REGISTER_REQUEST, NEW_REGISTER_SUCCESS, NEW_REGISTER_FAILURE } from '../actions/passport/register';
import { SEND_APPEAL_REQUEST, SEND_APPEAL_SUCCESS, SEND_APPEAL_FAILURE } from '../actions/passport/appeal';
import { EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAILURE } from '../actions/profile/edit';
import { AVATAR_UPLOAD_REQUEST, AVATAR_UPLOAD_SUCCESS, AVATAR_UPLOAD_FAILURE } from '../actions/profile/edit';
import { FORGET_AUTH_REQUEST, FORGET_AUTH_SUCCESS, FORGET_AUTH_FAILURE,
    FORGET_RESET_REQUEST, FORGET_RESET_SUCCESS, FORGET_RESET_FAILURE } from '../actions/passport/forget';
import { OLD_LOGIN_REQUEST, OLD_LOGIN_SUCCESS, OLD_LOGIN_FAILURE,
    OLD_REGISTER_REQUEST, OLD_REGISTER_SUCCESS, OLD_REGISTER_FAILURE } from '../actions/passport/old';
import { SEARCH_THREAD_REQUEST, SEARCH_THREAD_SUCCESS, SEARCH_THREAD_FAILURE } from '../actions/common/search';

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
    deleteThread: bypassingFactory({ types: [DELETE_THREAD_REQUEST, DELETE_THREAD_SUCCESS, DELETE_THREAD_FAILURE] }),
    deletePost: bypassingFactory({ 
        types: [DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE],
        mapActionToKey: action => action.deletePid
    }),
    newRegister: bypassingFactory({ types: [NEW_REGISTER_REQUEST, NEW_REGISTER_SUCCESS, NEW_REGISTER_FAILURE] }),
    appeal: bypassingFactory({ types: [SEND_APPEAL_REQUEST, SEND_APPEAL_SUCCESS, SEND_APPEAL_FAILURE] }),
    editProfile: bypassingFactory({ types: [EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAILURE] }),
    uploadAvatar: bypassingFactory({ types: [AVATAR_UPLOAD_REQUEST, AVATAR_UPLOAD_SUCCESS, AVATAR_UPLOAD_FAILURE] }),
    forgetAuth: bypassingFactory({ types: [FORGET_AUTH_REQUEST, FORGET_AUTH_SUCCESS, FORGET_AUTH_FAILURE] }),
    forgetReset: bypassingFactory({ types: [FORGET_RESET_REQUEST, FORGET_RESET_SUCCESS, FORGET_RESET_FAILURE] }),
    oldLogin: bypassingFactory({ types: [OLD_LOGIN_REQUEST, OLD_LOGIN_SUCCESS, OLD_LOGIN_FAILURE] }),
    oldRegister: bypassingFactory({ types: [OLD_REGISTER_REQUEST, OLD_REGISTER_SUCCESS, OLD_REGISTER_FAILURE] }),
    editThread: bypassingFactory({ types: [EDIT_THREAD_REQUEST, EDIT_THREAD_SUCCESS, EDIT_THREAD_FAILURE] }),
    searchThread: bypassingFactory({ types: [SEARCH_THREAD_REQUEST, SEARCH_THREAD_SUCCESS, SEARCH_THREAD_FAILURE] }),
    
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
    toast,
    profiles,
    messages,
    bypassing,
    publish,
    rank,
    switchButton,
    user: (state = Map()) => state,
    redirectLogin: (state = false) => state
});

const crossSliceReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return state.set(
                'user', fromJS(action.json.data)
            ).set(
                'redirectLogin', false
            );
        case 'GET_SELF_PROFILE_SUCCESS':
            const selfUid = state.getIn(['user', 'uid']);
            return state.setIn(
                ['user', 'username'],
                state.getIn(['profiles', selfUid, 'profile', 'name'])
            );
        case 'INIT':
            return state.set('user', fromJS(action.userFromLocal));
        case 'LOGOUT_SUCCESS':
        case 'GET_SELF_PROFILE_FAILURE':
            return state.set('user', null).set('redirectLogin', true);
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
