import React from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

import '../../styles/frame/header.less';
import logo from '../../assests/logo.png';
import slogan from '../../assests/slogan.jpg';


const Header = ({ isOpen, onToggleSidebar, onClickNewPost, headerContent }) => {
    const handleToggleSidebar = () => {
        onToggleSidebar(!isOpen);
    };
    const handleClickNewPost = () => {
        onClickNewPost();
    }
    const headerContentStyle = {
        transform: headerContent ? 'translateY(-100%)' : 'none'
    };

    return (
        <div>
            <div className="menu-button-wrapper">
                <i className="iconfont icon-menu"></i>
                <button
                    role="button"
                    onClick={handleToggleSidebar}
                >
                    Open Meun
                </button>
            </div>
            <img className="logo" src={logo} alt="logo" />

            <div 
                className="header-content" 
                style={headerContentStyle}
            >
                <section>
                    <img className="slogan" src={slogan} alt="slogan" />
                    
                </section>
                <section>
                    {headerContent}
                </section>
            </div>
            <Button
                className="raised quick-thread" 
                bsStyle="primary"
                onClick={handleClickNewPost}
            >
                发帖
            </Button>
        </div>
    );
};

Header.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onToggleSidebar: PropTypes.func.isRequired,
    onClickNewPost: PropTypes.func.isRequired,
};

export default Header;