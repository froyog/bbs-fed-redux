import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

import Header from './frame/Header';
import Sidebar from './frame/Sidebar';
import ErrorModal from './common/ErrorModal';
import Forum from './forum/ForumList';
import Board from './forum/BoardWrapper';
import Thread from './forum/ThreadWrapper';
import Home from './bbs-index/Home';
import UserIndex from './profile/UserIndex';
import NoMatch from '../components/NoMatch';
import { connect } from 'react-redux';
import { isMobile } from '../util.js';
import { toggleSidebar } from '../actions/frame/sidebar';

import '../styles/app.less';
import '../styles/global.less';


class App extends React.Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onToggleSidebar: PropTypes.func.isRequired
    };

    componentWillMount() {
        const { onToggleSidebar } = this.props;
        onToggleSidebar(!isMobile());
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
                <ErrorModal />
                <div id="main" style={mainStyle}>
                    <Grid>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/forum' component={Forum} />
                            <Route path='/forum/board/:bid/page/:page' component={Board} />
                            <Route path='/forum/thread/:tid/page/:page' component={Thread} />
                            <Route path='/user/:uid' component={UserIndex} />
                            <Route component={NoMatch} />
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
    onToggleSidebar: openStatus => dispatch(toggleSidebar(openStatus))
});
App = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export default App;
