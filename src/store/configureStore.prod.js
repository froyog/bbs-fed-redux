import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import callApi from '../middlewares/callApi';
import localize from '../middlewares/localize';
import piwikTracker from '../middlewares/piwikTracker';
import RavenMiddleware from 'redux-raven-middleware';

const configureStore = preloadedState =>
    createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunk,
            callApi,
            piwikTracker,
            localize,
            RavenMiddleware('https://de6f307b8ac24a1683da00b87ecd4b20@sentry.twtstudio.com/12')
        )
    );

export default configureStore;
