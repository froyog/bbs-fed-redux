import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import callApi from '../middlewares/callApi';
<<<<<<< HEAD
=======
import RavenMiddleware from 'redux-raven-middleware';
>>>>>>> 851e3b665e3f026226756cce42effda01296c4c0


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = preloadedState => {
    const store = createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(
<<<<<<< HEAD
            applyMiddleware(thunk, callApi)
=======
            applyMiddleware([
                thunk,
                callApi
            ])
>>>>>>> 851e3b665e3f026226756cce42effda01296c4c0
        )
    );

    if (module.hot) {
        module.hot.accept('../reducers/rootReducer', () => {
            const nextRootReducer = require('../reducers/rootReducer').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};

export default configureStore;
