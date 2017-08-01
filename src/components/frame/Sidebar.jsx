import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/frame/sidebar.less';


const Sidebar = props => {
    const { isOpen } = props;
    const sidebarOpenStyle = {
        'transform': `translateX(${isOpen ? '0' : '-100%'})`
    };

    return (
        <nav
            id="sidebar"
            role="navigation"
            style={sidebarOpenStyle}>

        </nav>
    );
};

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired
};

export default Sidebar;
