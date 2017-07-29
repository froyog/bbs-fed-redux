import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';

import '../../styles/frame/header.less';
import logo from '../../resources/logo.png';
import slogan from '../../resources/slogan.jpg';


const Header = props =>
    <header id="header" role="banner">
        <div className="menu-button-wrapper">
            <i className="iconfont icon-menu"></i>
            <button
                role="button"
                onClick={() => props.onToggleMenu()}
            >
                Open Meun
            </button>
        </div>
        <Link to="/">
            <img className="logo" src={logo} alt="logo" />
        </Link>
        <img className="slogan" src={slogan} alt="slogan" />
    </header>

export default Header;
