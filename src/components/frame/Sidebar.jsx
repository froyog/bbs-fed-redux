import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../../styles/frame/sidebar.less';
import Avatar from '../common/Avatar';


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
            <div className="avatar">
                <Avatar id={18480} />
                <p className="username">testuser</p>
                <p>scarlet0345@gmail.com</p>
            </div>
            <ul>
                <li><NavLink exact to='/' activeClassName="active">首页</NavLink></li>
                <li><NavLink to='/forum' activeClassName="active">论坛</NavLink></li>
                <li><NavLink to='/user' activeClassName="active">个人中心</NavLink></li>
                <li><NavLink to='#'>排行榜</NavLink></li>
            </ul>
        </nav>
    );
};

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired
};

export default Sidebar;
