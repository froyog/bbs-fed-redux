import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Badge, Button } from 'react-bootstrap';
import '../../styles/frame/sidebar.less';
import Avatar from '../common/Avatar';
import { isMobile } from '../../util';


const Sidebar = ({ isOpen, unreadMessageCount, onClickNav, 
    selfName, selfSignature, selfUid, isLogin, onLogout}) => {

    const sidebarOpenStyle = {
        'transform': `translateX(${isOpen ? '0' : '-100%'})`
    };
    const renderUnreadMessage = unreadMessageCount 
        ? <Badge className="sidebar-badge">{unreadMessageCount}</Badge>
        : null;
    const handleClickNav = () => {
        if (!isMobile()) return;
        onClickNav && onClickNav();
    }
    const handleLogout = () => {
        onLogout && onLogout();
    }

    return (
        <nav
            id="sidebar"
            role="navigation"
            style={sidebarOpenStyle}
        >
            { 
                isLogin
                    ? <div className="avatar">
                        <Avatar id={selfUid} />
                        <p className="username">{selfName}</p>
                        <p className="signature">{selfSignature || '这个人很懒什么都没有留下'}</p>
                        <Button 
                            className="raised opearate logout"
                            onClick={handleLogout}
                        >
                            登出
                        </Button>
                    </div>
                    : <div className="avatar">
                        <Avatar id={null} />
                        <p className="not-login">您当前未登录</p>
                        <p>
                            <Button 
                                href="/passport/login" 
                                className="raised opearate"
                            >
                                登录
                            </Button>
                            <Button 
                                href="/passport/register" 
                                className="raised opearate"
                            >
                                注册
                            </Button>
                        </p>
                    </div>
            }
            <ul onClick={handleClickNav}>
                <li><NavLink exact to='/' activeClassName="active">首页</NavLink></li>
                <li><NavLink to='/forum' activeClassName="active">论坛</NavLink></li>
                <li><NavLink to='/user' activeClassName="active">
                    个人中心{renderUnreadMessage}
                </NavLink></li>
                <li><NavLink to='#'>排行榜</NavLink></li>
            </ul>
        </nav>
    );
};

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClickNav: PropTypes.func.isRequired,
    unreadMessageCount: PropTypes.number,
    onLogout: PropTypes.func.isRequired,
    selfName: PropTypes.string,
    selfSignature: PropTypes.string,
    isLogin: PropTypes.bool,
};

export default Sidebar;
