import { combineReducers } from 'redux-immutable';
import forumList from './forum/forumList';
import boardList from './forum/boardList';
import board from './forum/board';
import sidebar from './frame/sidebar';
import bbsIndex from './bbsIndex';
import auth from '../alpha/reducer/auth';
import login from './passport/login';
import thread from './forum/thread';
import newThread from './forum/newThread';


// need refactoring
const rootReducer = combineReducers({
    sidebar,
    forumList,
    boardList,
    board,
    bbsIndex,
    auth,
    login,
    thread,
    newThread
});

export default rootReducer;
