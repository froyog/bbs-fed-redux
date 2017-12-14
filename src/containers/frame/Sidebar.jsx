import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { toggleSidebar, getUnreadMessage } from '../../actions/frame/sidebar';
import { logout } from '../../actions/passport/log-io';
import Sidebar from '../../components/frame/Sidebar';
import { toJS } from '../../util';

import '../../styles/frame/sidebar.less';


class SidebarWrapper extends React.Component {
    static propTypes = {
        getUnreadMessage: PropTypes.func.isRequired,
        onToggleSidebar: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        unreadMessageCount: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
        selfProfile: PropTypes.shape({
            isFetching: PropTypes.bool,
            error: PropTypes.string,
            profile: PropTypes.shape({
                name: PropTypes.string,
                signature: PropTypes.string
            })
        }),
        selfUid: PropTypes.number
    }

    constructor () {
        super();

        this.handleClickNav = this.handleClickNav.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount () {
        const { getUnreadMessage } = this.props;
        getUnreadMessage && getUnreadMessage();
    }

    componentWillReceiveProps (nextProps) {
        const { logoutMessage, logoutIsFetching, history } = nextProps;
        if (logoutMessage === '请求成功' && logoutIsFetching !== this.props.logoutIsFetching) {
            history.push('/');
        }
    }

    handleClickNav () {
        const { onToggleSidebar } = this.props;
        onToggleSidebar && onToggleSidebar(false);
    }

    handleLogout () {
        const { logout } = this.props;
        logout && logout();
    }

    render () {
        const { isOpen, onToggleSidebar, unreadMessageCount, 
            selfProfile, isLogin, selfUid } = this.props;
        const overlayStyle = {
            'opacity': isOpen ? '0.5' : '0',
            'visibility': isOpen ? 'visible' : 'hidden'
        };
        let name, signature;
        if (selfProfile && selfProfile.profile) {
            name = selfProfile.profile.name;
            signature = selfProfile.profile.signature;
        }
    
        return (
            <div>
                <Sidebar 
                    isOpen={isOpen} 
                    unreadMessageCount={unreadMessageCount}
                    onClickNav={this.handleClickNav}
                    selfName={name}
                    selfSignature={signature}
                    selfUid={selfUid}
                    isLogin={isLogin}
                    onLogout={this.handleLogout}
                />
                <div
                    className="sidebar-overlay"
                    role="presentation"
                    onClick={() => onToggleSidebar(false)}
                    style={overlayStyle}>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    const selfUid = state.getIn(['user', 'uid']);
    const selfProfile = state.getIn(['profiles', selfUid]);
    const logoutState = state.getIn(['bypassing', 'logout']);

    return {
        isOpen: state.get('sidebarIsOpen'),
        unreadMessageCount: state.getIn(['bypassing', 'unreadMessage', 'items']),
        selfProfile: selfProfile,
        selfUid: selfUid,
        isLogin: !!(state.getIn(['user', 'token'])),
        logoutMessage: logoutState.get('items'),
        logoutIsFetching: logoutState.get('isFetching')
    };
};
const mapDispatchToProps = dispatch => ({
    onToggleSidebar: openStatus => dispatch(toggleSidebar(openStatus)),
    getUnreadMessage: () => dispatch(getUnreadMessage()),
    logout: () => dispatch(logout())
});
SidebarWrapper = withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(SidebarWrapper)));

export default SidebarWrapper;
