import { combineReducers } from 'redux-immutable';
import forumList from './forumList';
import boardList from './boardList';


const rootReducer = combineReducers({
    forumList,
    boardList
});

export default rootReducer;
