import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSidebar } from '../../actions/frame/sidebar';
import BoardEditor from '../forum/BoardEditor';

import '../../styles/frame/header.less';
import logo from '../../assests/logo.png';
import slogan from '../../assests/slogan.jpg';


class Header extends React.Component {
    constructor () {
        super();
        this.state = {
            postingModalOpen: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ postingModalOpen: true });
    }

    handleCloseModal () {
        this.setState({ postingModalOpen: false });
    }

    render () {
        const { isOpen, onToggleSidebar } = this.props;
    
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
                <Button 
                    className="raised quick-thread" 
                    bsStyle="primary"
                    onClick={this.handleOpenModal}
                >
                    快速发帖
                </Button>
                <Modal
                    bsSize="large"
                    show={this.state.postingModalOpen}
                    onHide={this.handleCloseModal}
                    backdrop="static"
                    className="posting-modal"
                >
                    <BoardEditor
                        onCloseModal={this.handleCloseModal} />
                </Modal>
            </header>
        );
    }
};

Header.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onToggleSidebar: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    // current open state
    isOpen: state.get('sidebarIsOpen')
});
const mapDispatchToProps = (dispatch) => {
    return {
        onToggleSidebar: openStatus => dispatch(toggleSidebar(openStatus))
    };
};
Header = connect(mapStateToProps, mapDispatchToProps)(Header);

export default Header;
