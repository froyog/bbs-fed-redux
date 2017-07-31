import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleSidebar } from '../../actions/frame/sidebar';
import Sidebar from '../../components/frame/Sidebar';
import { isMobile } from '../../utils/isMobile';

import '../../styles/frame/sidebar.less';


class SidebarWrapper extends React.Component {
    componentWillMount() {
        const { onToggleSidebar } = this.props;
        onToggleSidebar(!isMobile());
    }

    render () {
        const { isOpen, onToggleSidebar } = this.props;

        const overlayStyle = {
            'opacity': isOpen ? '0.5' : '0',
            'visibility': isOpen ? 'visible' : 'hidden'
        };

        return (
            <div>
                <Sidebar isOpen={isOpen} />
                <div
                    className="sidebar-overlay"
                    role="presentation"
                    onClick={() => onToggleSidebar(false)}
                    style={overlayStyle}>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    isOpen: state.get('sidebar')
});
const mapDispatchToProps = dispatch => ({
    onToggleSidebar: openStatus => dispatch(toggleSidebar(openStatus))
});
SidebarWrapper = connect(mapStateToProps, mapDispatchToProps)(SidebarWrapper);

export default SidebarWrapper;