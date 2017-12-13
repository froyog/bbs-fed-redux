import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleSidebar, getUnreadMessage } from '../../actions/frame/sidebar';
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
        })
    }

    constructor () {
        super();

        this.handleClickNav = this.handleClickNav.bind(this);
    }

    componentWillMount () {
        const { getUnreadMessage } = this.props;
        getUnreadMessage && getUnreadMessage();
    }

    handleClickNav () {
        const { onToggleSidebar } = this.props;
        onToggleSidebar && onToggleSidebar(false);
    }

    render () {
        const { isOpen, onToggleSidebar, unreadMessageCount, selfProfile, isLogin } = this.props;
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
                    isLogin={isLogin}
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

    return {
        isOpen: state.get('sidebarIsOpen'),
        unreadMessageCount: state.getIn(['bypassing', 'unreadMessage', 'items']),
        selfProfile: selfProfile,
        isLogin: !!(state.getIn(['user', 'token']))
    };
};
const mapDispatchToProps = dispatch => ({
    onToggleSidebar: openStatus => dispatch(toggleSidebar(openStatus)),
    getUnreadMessage: () => dispatch(getUnreadMessage())
});
SidebarWrapper = withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(SidebarWrapper)));

export default SidebarWrapper;
