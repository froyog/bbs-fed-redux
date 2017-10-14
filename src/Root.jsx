import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './containers/App';
import Passport from './containers/passport/Passport';
import Welcome from './alpha/Welcome';
import PrivateRoute from './alpha/PrivateRoute';

import './styles/icon-font/iconfont.css';


const store = configureStore();

const Root = () =>
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path='/welcome' component={Welcome} />
                <Route path='/passport' component={Passport} />
                <PrivateRoute path='/' component={App} />
            </Switch>
        </Router>
    </Provider>;

export default Root;
