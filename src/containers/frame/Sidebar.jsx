import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleSidebar, getUnreadMessage } from '../../actions/frame/sidebar';
import Sidebar from '../../components/frame/Sidebar';

import '../../styles/frame/sidebar.less';


class SidebarWrapper extends React.Component {
    static propTypes = {
        getUnreadMessage: PropTypes.func.isRequired,
        onToggleSidebar: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        unreadMessageCount: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
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
        const { isOpen, onToggleSidebar, unreadMessageCount } = this.props;
        const overlayStyle = {
            'opacity': isOpen ? '0.5' : '0',
            'visibility': isOpen ? 'visible' : 'hidden'
        };
    
        return (
            <div>
                <Sidebar 
                    isOpen={isOpen} 
                    unreadMessageCount={unreadMessageCount}
                    onClickNav={this.handleClickNav}
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
    const selfProfile = state.getIn(['profile', selfUid]);

    return {
        isOpen: state.get('sidebarIsOpen'),
        unreadMessageCount: state.getIn(['bypassing', 'unreadMessage', 'items']),
        selfProfile: selfProfile
    };
};
const mapDispatchToProps = dispatch => ({
    onToggleSidebar: openStatus => dispatch(toggleSidebar(openStatus)),
    getUnreadMessage: () => dispatch(getUnreadMessage())
});
SidebarWrapper = withRouter(connect(mapStateToProps, mapDispatchToProps)(SidebarWrapper));

export default SidebarWrapper;
