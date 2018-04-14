import React from 'react';
import PropTypes from 'prop-types';
import asyncComponent from '../../asyncComponent';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Search from './Search';
import { toggleSidebar } from '../../actions/frame/sidebar';
import { showToast } from '../../actions/common/toast';
import Header from '../../components/frame/Header';
import { toJS } from '../../util';
import FeatureDiscovery from '../../components/frame/FeatureDiscovery';
// import BoardEditor from '../forum/BoardEditor';
const AsyncBoardEditor = asyncComponent(() => import('../forum/BoardEditor'));


class HeaderWrapper extends React.PureComponent {
    constructor () {
        super();
        this.state = {
            headerContent: '',
            tapIsShow: false,
            updateDate: Date.parse('2018-3-6')
        };

        this.handleUnmountTap = this.handleUnmountTap.bind(this);
        this.handleClickNewPost = this.handleClickNewPost.bind(this);
    }

    componentDidMount () {
        const readState = JSON.parse(localStorage.getItem('featureIsRead'));
        const { updateDate } = this.state;
        if (!readState || !readState.isRead || readState.readDate < updateDate) {
            this.setState({
                tapIsShow: true
            });
        }
    }

    componentWillReceiveProps (nextProps) {
        const { path, threadTitle } = nextProps;
        if (threadTitle) {
            let headerContent;
            if (path.indexOf('/forum/thread') !== -1) {
                headerContent = threadTitle;
            } else {
                headerContent = '';
            }
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.setState({
                    headerContent: headerContent
                });
            }, 500);
        }
    }

    componentWillUnmount () {
        clearTimeout(this.timer);
    }

    handleClickNewPost () {
        const { isLogin, showToast, history, currentBoardInfo } = this.props;
        if (!isLogin) {
            showToast('您未登录');
            return;
        }
        history.push('/forum/thread/new', { currentBoardInfo: currentBoardInfo });
    }

    handleUnmountTap () {
        localStorage.setItem('featureIsRead', JSON.stringify({
            isRead: true,
            readDate: new Date().getTime()
        }));
        this.setState({ tapIsShow: false });
    }

    render () {
        const { isOpen, onToggleSidebar } = this.props;
        const { headerContent, tapIsShow } = this.state;

        return (
            <header id="header" role="banner">
                <Header 
                    isOpen={isOpen}
                    onToggleSidebar={onToggleSidebar}
                    headerContent={headerContent}
                    onClickNewPost={this.handleClickNewPost}
                />
                <Search />
                {
                    tapIsShow &&
                    <FeatureDiscovery 
                        onUnmountTap={this.handleUnmountTap}
                    />
                }
            </header>
        );
    }
};

HeaderWrapper.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onToggleSidebar: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const thread = state.getIn(['thread', '1']);
    let threadTitle, result, currentBoardInfo;
    if (thread && !thread.get('isFetching')) {
        threadTitle = thread.getIn(['threadInfo', 'title']);
    }
    // eslint-disable-next-line    
    if (result = /^\/forum\/board\/(\d+)\/page/.exec(ownProps.location.pathname)) {
        let bid = result[1];
        currentBoardInfo = state.getIn(['board', bid, 'boardInfo']);
    }

    return {
        isLogin: !!(state.getIn(['user', 'uid'])),
        isOpen: state.get('sidebarIsOpen'),
        threadTitle,
        currentBoardInfo
    };
};
const mapDispatchToProps = dispatch => ({
    showToast: message => dispatch(showToast(message)),
    onToggleSidebar: openStatus => dispatch(toggleSidebar(openStatus))
});
HeaderWrapper = withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(HeaderWrapper)));

export default HeaderWrapper;
