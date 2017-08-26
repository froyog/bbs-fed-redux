import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getBoard } from '../../actions/board';
import ThreadItem from '../../components/common/ThreadItem';
import { Card } from '../../components/common/Card';
import FetchingOverlay from '../../components/common/FetchingOverlay';
import { toJS, isEqual } from '../../util.js';

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
            activePage: 1
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount() {
        const { getBoard, match: { params: { bid, page } } } = this.props;
        getBoard(bid, page, '', '');
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

    render () {
        const { isFetching, boardInfo, threadList } = this.props;
        if (isFetching || !boardInfo || !threadList) {
            return <FetchingOverlay fullPage />;
        }

        const { name, cThread, info, moderator } = boardInfo;
        const renderThreads = threadList.map(thread =>
            <ThreadItem key={thread.id} thread={thread} />
        );
        const renderModerator = moderator.map(admin => {
            const { uid, name } = admin;
            return <Link className="admin-name" to={`/user/${uid}`}>name</Link>;
        });

        return (
            <Card
                title={name}
                nopadding={
                    <ul className="thread-list-withborder">
                        {renderThreads}
                    </ul>
                }
                action={
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        maxButtons={6}
                        bsSize="medium"
                        items={Math.ceil(cThread / 50)}
                        activePage={this.state.activePage}
                        onSelect={this.handleSelect} />
                }
            >
                <p>版主：暂无</p>
                <p>帖数：{cThread}</p>
                <p>简介：{info}</p>
            </Card>
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
