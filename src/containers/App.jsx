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
import Me from './Me';
import NoMatch from '../components/NoMatch';
import { connect } from 'react-redux';
import { isMobile } from '../util.js';
import { toggleSidebar } from '../actions/frame/sidebar';

import '../styles/app.less';
import '../styles/global.less';


class App extends React.Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onToggleSidebar: PropTypes.func.isRequired,
        maxYoffset: PropTypes.number,
        minXOffset: PropTypes.number,
        minXDragDistance: PropTypes.number
    };

    static defaultProps = {
        maxYoffset: 150, // pixel
        minXOffset: 60,
        minXDragDistance: 100
    };

    constructor () {
        super();
        this.state = {
            startX: 0,
            lastX: 0,
            startY: 0,
            lastY: 0
        };

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handlePageScroll = this.handlePageScroll.bind(this);
    }

    componentWillMount() {
        const { onToggleSidebar } = this.props;
        onToggleSidebar(!isMobile());
    }

    handlePageScroll () {
        console.log(document.body.scrollTop);
    }

    handleTouchStart (e) {
        this.setState({
            startX: e.touches[0].clientX,
            startY: e.touches[0].clientY
        });
    }

    handleTouchMove (e) {
        this.setState({
            lastX: e.touches[0].clientX,
            lastY: e.touches[0].clientY
        });
    }

    handleTouchEnd () {
        const { startX, lastX, startY, lastY } = this.state;
        const { onToggleSidebar, maxYoffset, minXOffset, minXDragDistance } = this.props;

        this.setState({
            startX: 0,
            lastX: 0,
            startY: 0,
            lastY: 0
        });

        if (Math.abs(startY - lastY) > maxYoffset) return;

        if (lastX - startX > minXOffset && startX < minXDragDistance) {
            // slide right (open)
            // drag startX must be restricted
            onToggleSidebar(true);
        } else if (startX - lastX > minXOffset) {
            // slide left (close)
            onToggleSidebar(false);
        }

    }

    render () {
        const { isOpen } = this.props;
        const mainStyle = {
            [isMobile() ? 'left' : 'marginLeft']: `${isOpen ? '200px' : '0'}`
        };
        return (
            <div id="frame" onScroll={this.handlePageScroll}>
                <Header />
                <Sidebar />
                <ErrorModal />
                <div id="main" style={mainStyle}>
                    <Grid>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/forum' component={Forum} />
                            <Route path='/forum/board/:bid/page/:page' component={Board} />
                            <Route path='/forum/thread/:tid/page/:page' component={Thread} />
                            <Route path='/user/me' component={Me} />
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
