import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './containers/App';

import './styles/icon-font/iconfont.css';


const store = configureStore();

const Root = () =>
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>;

export default Root;
