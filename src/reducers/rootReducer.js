import { combineReducers } from 'redux-immutable';
import forumList from './forum/forumList';
import boardList from './forum/boardList';
import board from './forum/board';
import sidebar from './frame/sidebar';


const rootReducer = combineReducers({
    sidebar,
    forumList,
    boardList,
    board
});

export default rootReducer;
