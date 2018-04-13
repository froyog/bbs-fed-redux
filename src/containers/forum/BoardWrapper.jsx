import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Pagination, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getBoard, refreshBoard } from '../../actions/forum/board';
import SwitchButton from './SwitchButton';
import ThreadItem from '../../components/common/ThreadItem';
import { Card } from '../../components/common/Card';
import { FetchingOverlay } from '../../components/common/Loading';
import { toJS, isEqual } from '../../util.js';
import { Breadcrumb, BreadcrumbItem } from '../../components/common/Breadcrumb';
import RefreshButton from '../../components/common/RefreshButton';
import { ErrorOverlay } from '../../components/common/ErrorModal';

import '../../styles/forum/board.less';


class BoardWrapper extends React.Component {
    static propTypes = {
        getBoard: PropTypes.func.isRequired,
        refreshBoard: PropTypes.func.isRequired,
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
        this.handleRefresh = this.handleRefresh.bind(this);
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
        let changedOrder;
        if (order === '') {
            changedOrder = 'create';
        } else if (order === 'create') {
            changedOrder = '';
        }
        getBoard(bid, 1, type, changedOrder);
    }

    handleRefresh () {
        const { getBoard, refreshBoard, match: { params: { bid } }, type, order } = this.props;
        refreshBoard(bid);
        getBoard(bid, 1, type, order);
    }

    render () {
        const { isFetching, boardInfo, threadList, type, order, error } = this.props;
        const { activePage } = this.state;
        if (error) return <ErrorOverlay reason={error} needRefresh />;
        if (isFetching || !boardInfo || !threadList) {
            return <FetchingOverlay fullPage />;
        }

        const { name, cThread, cElite, info, moderator, id, follow } = boardInfo;
        const paginationItems = type === 'elite' ? cElite : cThread;
        const renderModerator = moderator.map(admin => {
            const { uid, name } = admin;
            return <Link className="admin-name" to={`/user/${uid}`}>{name} </Link>;
        });
        let renderThreads;
        if (paginationItems <= 0) {
            renderThreads = <p className="no-data">暂无帖子</p>;
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
                    <BreadcrumbItem to={`/forum/board/${id}/page/${activePage}`} active>
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
                        <SwitchButton
                            switchType="follow"
                            id={id}
                            initialState={follow}
                        >
                            {(active, onClickButton) => {
                                return <Button 
                                    className="flat" 
                                    bsStyle="link"
                                    onClick={onClickButton}
                                >
                                    {active ? '已关注' :　'关注'}
                                </Button>;
                            }}

                        </SwitchButton>
                    </div>
                    <p>版主：{renderModerator.length ? renderModerator : '暂无' }</p>
                    <p>帖数：{cThread}</p>
                    <p>简介：{info}</p>
                    <div className="clearfix baord-header-wrapper">
                        <ul className="tabs board pull-left">
                            <li className="tab">
                                <a 
                                    id="" 
                                    className={`${type === '' ? 'active' : ''}`} 
                                    onClick={this.handleTypeChange}
                                >
                                    全部
                                </a>
                            </li>
                            <li className="tab">
                                <a 
                                    id="elite" 
                                    className={`${type === 'elite' ? 'active' : ''}`} 
                                    onClick={this.handleTypeChange}
                                >
                                    精华
                                </a>
                            </li>
                        </ul>
                        <div 
                            className="board-operation pull-right"
                            id={order}
                            onClick={this.handleOrderChange}
                        >
                            {order === 'create' ? '按最新发布' : '按最新回复'}
                        </div>
                        <RefreshButton 
                            className="board-refresh-button" 
                            onClick={this.handleRefresh}
                        />
                    </div>
                </Card>
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
        error: board.get('error'),
        threadList: board.get('threadList'),
        type: board.get('type'),
        order: board.get('order')
    };
};
const mapDispatchToProps = dispatch => ({
    getBoard: (bid, page, type, order) => dispatch(getBoard(bid, page, type, order)),
    refreshBoard: bid => dispatch(refreshBoard(bid))
});

BoardWrapper = connect(mapStateToProps, mapDispatchToProps)(toJS(BoardWrapper));
export default BoardWrapper;
