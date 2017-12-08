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

    componentWillMount () {
        this.props.getUnreadMessage();
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

const mapStateToProps = state => ({
    isOpen: state.get('sidebarIsOpen'),
    unreadMessageCount: state.getIn(['bypassing', 'unreadMessage', 'items'])
});
const mapDispatchToProps = dispatch => ({
    onToggleSidebar: openStatus => dispatch(toggleSidebar(openStatus)),
    getUnreadMessage: () => dispatch(getUnreadMessage())
});
SidebarWrapper = withRouter(connect(mapStateToProps, mapDispatchToProps)(SidebarWrapper));

export default SidebarWrapper;
