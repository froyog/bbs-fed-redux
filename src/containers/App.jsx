import React from 'react';
import PropTypes from 'prop-types';
import asyncComponent from '../asyncComponent';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

import Header from './frame/Header';
import Sidebar from './frame/Sidebar';
import Toast from './common/Toast';
import Home from './bbs-index/Home';
import Forum from './forum/ForumList';
import Board from './forum/BoardWrapper';
const AsyncThread = asyncComponent(() => import('./forum/ThreadWrapper.jsx'));
const AsyncUserBase = asyncComponent(() => import('./profile/UserBase'));
import Rank from './rank/Rank';
import { connect } from 'react-redux';
import { isMobile } from '../util.js';
import { toggleSidebar } from '../actions/frame/sidebar';
import { initFromLocal } from '../actions/init';
import { getProfileIfNeeded } from '../actions/profile/profile';

import '../styles/app.less';
import '../styles/global.less';


class App extends React.Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onToggleSidebar: PropTypes.func.isRequired,
        initFromLocal: PropTypes.func.isRequired,
        getSelfProfile: PropTypes.func.isRequired
    };

    componentWillMount() {
        const { onToggleSidebar, initFromLocal, getSelfProfile } = this.props;

        onToggleSidebar(!isMobile());

        const user = JSON.parse(localStorage.getItem('user'));
        initFromLocal(user);

        getSelfProfile();
    }

    render () {
        const { isOpen, location } = this.props;
        const mainStyle = {
            [isMobile() ? 'left' : 'marginLeft']: `${isOpen ? '200px' : '0'}`
        };
        return (
            <div id="frame" onScroll={this.handlePageScroll}>
                <Header path={location.pathname}/>
                <Sidebar />
                <Toast />
                <div id="main" style={mainStyle}>
                    <Grid>
                        <Switch>
                            <Redirect exact from="/user" to="/user/me/messages" />
                            <Route exact path="/" component={Home} />
                            <Route exact path="/forum" component={Forum} />
                            <Route path="/forum/board/:bid/page/:page" component={Board} />
                            <Route path="/forum/thread/:tid/page/:page" component={AsyncThread} />
                            <Route path="/user/:uid" component={AsyncUserBase} />
                            <Route path="/rank" component={Rank} />
                            <Redirect from="*" to="/404" />
                        </Switch>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isOpen: state.get('sidebarIsOpen')
});
const mapDispatchToProps = dispatch => ({
    onToggleSidebar: openStatus => dispatch(toggleSidebar(openStatus)),
    initFromLocal: userState => dispatch(initFromLocal(userState)),
    getSelfProfile: () => dispatch(getProfileIfNeeded('me'))
});
App = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export default App;
