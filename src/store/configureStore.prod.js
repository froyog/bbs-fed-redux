import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import callApi from '../middlewares/callApi';
import RavenMiddleware from 'redux-raven-middleware';


const configureStore = preloadedState =>
    createStore(
        rootReducer,
        preloadedState,
        applyMiddleware([
            thunk,
            callApi,
            RavenMiddleware('https://8891a3afc2114a23b94e4f4f0eb942ec@sentry.io/206012')
        ])
    );

export default configureStore;
