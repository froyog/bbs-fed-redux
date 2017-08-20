import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import callApi from '../middlewares/callApi';
import RavenMiddleware from 'redux-raven-middleware';


const configureStore = preloadedState =>
    createStore(
        rootReducer,
        preloadedState,
<<<<<<< HEAD
        applyMiddleware(
            thunk,
            callApi,
            RavenMiddleware('https://8891a3afc2114a23b94e4f4f0eb942ec@sentry.io/206012')
        )
=======
        applyMiddleware([
            thunk,
            callApi,
            RavenMiddleware('https://8891a3afc2114a23b94e4f4f0eb942ec@sentry.io/206012')
        ])
>>>>>>> 851e3b665e3f026226756cce42effda01296c4c0
    );

export default configureStore;
