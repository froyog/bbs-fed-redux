import { combineReducers } from 'redux-immutable';
import { forumList } from './forumList';


const rootReducer = combineReducers({
    forumList
});

export default rootReducer;
