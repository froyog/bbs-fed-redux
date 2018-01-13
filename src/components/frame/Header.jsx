import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import '../../styles/frame/header.less';
import logo from '../../assests/logo.png';
import slogan from '../../assests/slogan.jpg';


const Header = ({ isOpen, onToggleSidebar, onOpenModal, headerContent }) => {
    const handleToggleSidebar = () => {
        onToggleSidebar(!isOpen);
    };
    const handleOpenModal = () => {
        onOpenModal();
    };
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
                    <Button
                        className="raised quick-thread" 
                        bsStyle="primary"
                        onClick={handleOpenModal}
                    >
                        发帖
                    </Button>
                </section>
                <section>
                    {headerContent}
                </section>
            </div>
        </div>
    );
};

Header.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onToggleSidebar: PropTypes.func.isRequired,
    onOpenModal: PropTypes.func.isRequired
};

export default Header;