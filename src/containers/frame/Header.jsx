import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toggleSidebar } from '../../actions/frame/sidebar';
import BoardEditor from '../forum/BoardEditor';
import Header from '../../components/frame/Header';


class HeaderWrapper extends React.PureComponent {
    constructor () {
        super();
        this.state = {
            postingModalOpen: false,
            headerContent: ''
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        const { path, threadTitle } = nextProps;
        if (nextProps.path.indexOf('/forum/thread') !== -1) {
            this.setState({
                headerContent: threadTitle
            });
        } else {
            this.setState({
                headerContent: ''
            });
        }
    }

    handleOpenModal () {
        this.setState({ postingModalOpen: true });
    }

    handleCloseModal () {
        this.setState({ postingModalOpen: false });
    }

    render () {
        const { isOpen, onToggleSidebar } = this.props;
        const { headerContent } = this.state;

        return (
            <header id="header" role="banner">
                <Header 
                    isOpen={isOpen}
                    onToggleSidebar={onToggleSidebar}
                    onOpenModal={this.handleOpenModal}
                    headerContent={this.state.headerContent}
                />
                <Modal
                    bsSize="large"
                    show={this.state.postingModalOpen}
                    onHide={this.handleCloseModal}
                    backdrop="static"
                    className="posting-modal"
                >
                    <BoardEditor onCloseModal={this.handleCloseModal} />
                </Modal>
            </header>
        );
    }
};

HeaderWrapper.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onToggleSidebar: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    const thread = state.getIn(['thread', '1']);
    let threadTitle;
    if (thread && !thread.get('isFetching')) {
        threadTitle = thread.getIn(['threadInfo', 'title']);
    }

    return {
        isOpen: state.get('sidebarIsOpen'),
        threadTitle: threadTitle
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onToggleSidebar: openStatus => dispatch(toggleSidebar(openStatus))
    };
};
HeaderWrapper = (connect(mapStateToProps, mapDispatchToProps)(HeaderWrapper));

export default HeaderWrapper;
