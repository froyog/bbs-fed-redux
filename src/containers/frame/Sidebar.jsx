import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/frame/sidebar.less';

class Sidebar extends React.Component {


    render () {
        const { open, onCloseSidebar } = this.props;
        const sidebarOpenStyle = {
            'transform': `translateX(${open ? '0' : '-100%'})`
        };
        const overlayStyle = {
            'opacity': open ? '0.5' : '0',
            'visibility': open ? 'visible' : 'hidden'
        };

        return (
            <div>
                <nav
                    id="sidebar"
                    role="navigation"
                    style={sidebarOpenStyle}>
                </nav>
                <div
                    className="sidebar-overlay"
                    role="presentation"
                    onClick={() => onCloseSidebar()}
                    style={overlayStyle}>
                </div>
            </div>
        )
    }
}

export default Sidebar;
