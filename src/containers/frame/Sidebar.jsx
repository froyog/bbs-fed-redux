import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/frame/sidebar.less';

class Sidebar extends React.Component {
    render () {
        const { open } = this.props;
        const sidebarOpenStyle = {
            'transform': `translateX(${open ? '0' : '-100%'})`
        };

        return (
            <nav
                id="sidebar"
                role="navigation"
                style={sidebarOpenStyle}>

            </nav>
        )
    }
}

export default Sidebar;
