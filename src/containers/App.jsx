import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link, withRouter } from 'react-router-dom';

import Header from './frame/Header';
import Sidebar from './frame/Sidebar';
import Forum from './forum/ForumList';
import Board from './forum/BoardWrapper';
import Home from './Home';
import Me from './Me';
import NoMatch from '../components/NoMatch';
import { connect } from 'react-redux';
import { isMobile } from '../utils/isMobile';
import { toggleSidebar } from '../actions/frame/sidebar';

import '../styles/app.less';
import '../styles/global.less';


const TestHome = () =>
    <h2>Home</h2>

const TestForum = () =>
    <h2>TestForum</h2>


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
    }

    componentWillMount() {
        const { onToggleSidebar } = this.props;
        onToggleSidebar(!isMobile());
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
            <div
                id="frame"
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}
            >
                <Header />
                <Sidebar />
                <div id="main" style={mainStyle}>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/forum' component={Forum} />
                        <Route path='/forum/board/:bid' component={Board} />
                        <Route path='/user/me' component={Me} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isOpen: state.get('sidebar')
});
const mapDispatchToProps = dispatch => ({
    onToggleSidebar: openStatus => dispatch(toggleSidebar(openStatus))
});
App = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export default App;
