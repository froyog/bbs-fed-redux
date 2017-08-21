import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
            style={sidebarOpenStyle}
        >
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/forum'>Forum</Link></li>
            </ul>
        </nav>
    );
};

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired
};

export default Sidebar;
