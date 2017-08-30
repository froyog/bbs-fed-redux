import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Pagination, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getBoard } from '../../actions/board';
import ThreadItem from '../../components/common/ThreadItem';
import { Card } from '../../components/common/Card';
import FetchingOverlay from '../../components/common/FetchingOverlay';
import { toJS, isEqual } from '../../util.js';
import PostingEditor from './PostingEditor';
import { Breadcrumb, BreadcrumbItem } from '../../components/common/Breadcrumb';

import '../../styles/forum/board.less';


class BoardWrapper extends React.Component {
    static propTypes = {
        getBoard: PropTypes.func.isRequired,
        isFetching: PropTypes.bool,
        boardInfo: PropTypes.shape({
            name: PropTypes.string,
            forumName: PropTypes.string,
            forumId: PropTypes.number,
            cThread: PropTypes.number,
            anonymous: PropTypes.number,
            info: PropTypes.string,
            cElite: PropTypes.number,
            id: PropTypes.number,
            moderator: PropTypes.arrayOf(PropTypes.shape({
                uid: PropTypes.number,
                name: PropTypes.string,
                nickname: PropTypes.string
            }))
        }),
        threadList: PropTypes.arrayOf(PropTypes.shape({
            bElite: PropTypes.number,
            bTop: PropTypes.number,
            authorName: PropTypes.string,
            authorId: PropTypes.number,
            tReply: PropTypes.number,
            id: PropTypes.number,
            title: PropTypes.string,
            tCreate: PropTypes.number
        }).isRequired),
        order: PropTypes.string,
        type: PropTypes.string
    };

    constructor () {
        super();
        this.state = {
            activePage: 1,
            postingModalOpen: false
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this)
    }

    componentWillMount() {
        const { getBoard, match: { params: { bid, page } } } = this.props;
        getBoard(bid, page, '', '');
        this.setState({ activePage: +page });
    }

    componentWillReceiveProps(nextProps) {
        const { match: { params, params: { bid, page } },
                type, order } = nextProps;
        const { getBoard, match: { params: oldParams } } = this.props;

        if (!isEqual(params, oldParams)) {
            this.setState({ activePage: +page });
            getBoard(bid, page, type, order);
        }
    }

    handleSelect (eventKey) {
        this.setState({
            activePage: eventKey
        });
        const { match: { params: { bid } }, history } = this.props;
        history.push(`/forum/board/${bid}/page/${eventKey}`);
    }

    handleTypeChange ({ target }) {
        const { getBoard, match: { params: { bid } } } = this.props;
        let type = target.id || '';
        getBoard(bid, 1, type, '');
    }

    handleOrderChange ({ target }) {
        const { getBoard, match: { params: { bid } }, type } = this.props;
        let order = target.id || '';
        getBoard(bid, 1, type, order);
    }

    handleOpenModal () {
        this.setState({
            postingModalOpen: true
        });
    }

    handleCloseModal () {
        this.setState({
            postingModalOpen: false
        });
    }

    render () {
        const { isFetching, boardInfo, threadList, type, order } = this.props;
        if (isFetching || !boardInfo || !threadList) {
            return <FetchingOverlay fullPage />;
        }

        const { name, cThread, cElite, info, moderator, id } = boardInfo;
        const paginationItems = type === 'elite' ? cElite : cThread;
        const renderModerator = moderator.map(admin => {
            const { uid, name } = admin;
            return <Link className="admin-name" to={`/user/${uid}`}>{name}</Link>;
        });
        let renderThreads;
        if (paginationItems <= 0) {
            renderThreads = <p className="no-data">暂无数据，快来抢沙发啊（哦精华贴你似乎抢不了）</p>;
        } else {
            renderThreads = threadList.map(thread =>
                <ThreadItem key={thread.id} thread={thread} />
            );
        }

        return (
            <div>
                <Breadcrumb>
                    <BreadcrumbItem to="/">首页</BreadcrumbItem>
                    <BreadcrumbItem to="/forum">所有分区</BreadcrumbItem>
                    <BreadcrumbItem to="/forum/board/${id}/page/1" active>
                        {name}
                    </BreadcrumbItem>
                </Breadcrumb>
                <Card
                    className="no-padding"
                    title={name}
                    nopadding={
                        <div>
                            <ul className="thread-list-withborder">
                                {renderThreads}
                            </ul>
                            {
                                paginationItems > 50 &&
                                <Pagination
                                    prev
                                    next
                                    first
                                    last
                                    ellipsis
                                    boundaryLinks
                                    maxButtons={3}
                                    bsSize="medium"
                                    items={Math.ceil(paginationItems / 50)}
                                    activePage={this.state.activePage}
                                    onSelect={this.handleSelect} />
                            }
                        </div>
                    }
                >
                    <div className="board-buttons">
                        <Button className="flat" bsStyle="link">关注</Button>
                        <Button
                            className="flat"
                            bsStyle="link"
                            onClick={this.handleOpenModal}
                        >
                            发帖
                        </Button>
                    </div>
                    <p>版主：{renderModerator.length ? renderModerator : '暂无' }</p>
                    <p>帖数：{cThread}</p>
                    <p>简介：{info}</p>
                    <ul className="tabs">
                        <li className={`tab ${type === '' ? 'active' : ''}`}>
                            <a id="" onClick={this.handleTypeChange}>全部</a>
                        </li>
                        <li className={`tab ${type === 'elite' ? 'active' : ''}`}>
                            <a id="elite" onClick={this.handleTypeChange}>精华</a>
                        </li>
                    </ul>
                    <ul className="board-operation">
                        <span>排序</span>
                        <li
                            className={`${order === '' ? 'active' : ''}`}
                            id=""
                            onClick={this.handleOrderChange}
                        >
                            按最新回复
                        </li>
                        <li
                            className={`${order === 'create' ? 'active': ''}`}
                            id="create"
                            onClick={this.handleOrderChange}
                        >
                            按最新发布
                        </li>
                        <Button className="raised refresh" bsStyle="success">刷新</Button>
                    </ul>
                </Card>
                <Modal
                    bsSize="large"
                    show={this.state.postingModalOpen}
                    onHide={this.handleCloseModal}
                    backdrop="static"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>发表帖子</Modal.Title>
                    </Modal.Header>
                    <PostingEditor />
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const bid = ownProps.match.params.bid;
    const board = state.getIn(['board', bid]);

    if (!board) return {};
    return {
        isFetching: board.get('isFetching'),
        boardInfo: board.get('boardInfo'),
        threadList: board.get('threadList'),
        type: board.get('type'),
        order: board.get('order')
    };
};
const mapDispatchToProps = dispatch => ({
    getBoard: (bid, page, type, order) => dispatch(getBoard(bid, page, type, order))
});

BoardWrapper = connect(mapStateToProps, mapDispatchToProps)(toJS(BoardWrapper));
export default BoardWrapper;
