import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSidebar } from '../../actions/frame/sidebar';

import '../../styles/frame/header.less';
import logo from '../../resources/logo.png';
import slogan from '../../resources/slogan.jpg';


let Header = props => {
    const { isOpen, onToggleSidebar } = props;
    
    return (
        <header id="header" role="banner">
            <div className="menu-button-wrapper">
                <i className="iconfont icon-menu"></i>
                <button
                    role="button"
                    onClick={() => onToggleSidebar(!isOpen)}
                >
                    Open Meun
                </button>
            </div>
            <Link to="/">
                <img className="logo" src={logo} alt="logo" />
            </Link>
            <img className="slogan" src={slogan} alt="slogan" />
        </header>
    );
};


const mapStateToProps = state => ({
    // current open state
    isOpen: state.get('sidebar')
});
const mapDispatchToProps = (dispatch) => {
    return {
        onToggleSidebar: openStatus => dispatch(toggleSidebar(openStatus))
    };
};
Header = connect(mapStateToProps, mapDispatchToProps)(Header);

export default Header;
