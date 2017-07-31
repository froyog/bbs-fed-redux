import { combineReducers } from 'redux-immutable';
import forumList from './forumList';
import boardList from './boardList';
import sidebar from './frame/sidebar';


const rootReducer = combineReducers({
    forumList,
    boardList,
    sidebar
});

export default rootReducer;
