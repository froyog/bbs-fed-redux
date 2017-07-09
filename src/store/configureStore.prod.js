import { createStore, applyMiddleware } from 'redux';
import middlewares from './middlewares';
import rootReducer from '../reducers/rootReducer';


const configureStore = preloadedState =>
    createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(...middlewares)
    );

export default configureStore;
