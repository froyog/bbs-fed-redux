import { combineReducers } from 'redux-immutable';
import forumList from './forum/forumList';
import boardList from './forum/boardList';
import board from './forum/board';
import sidebar from './frame/sidebar';
import bbsIndex from './bbsIndex';
import auth from '../alpha/reducer/auth';
import login from './passport/login';

const rootReducer = combineReducers({
    sidebar,
    forumList,
    boardList,
    board,
    bbsIndex,
    auth,
    login
});

export default rootReducer;
