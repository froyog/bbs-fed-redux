import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './containers/App';
import NotFound from './components/NotFound';
import Passport from './containers/passport/Passport';
import ImageContainer from './containers/common/ImageContainer';

import './styles/icon-font/iconfont.css';


const store = configureStore();

const Root = () =>
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/passport" component={Passport} />
                <Route path="/404" component={NotFound} />
                <Route path="/api/img/:imgId" component={ImageContainer} />
                <Route path="/" component={App} />
            </Switch>
        </Router>
    </Provider>;

export default Root;
