import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { getBoard } from '../../actions/board';
import { Card } from '../../components/common/Card';
import FetchingOverlay from '../../components/common/FetchingOverlay';
import { toJS } from '../../utils/to-js';


class BoardWrapper extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool,
        boardInfo: PropTypes.shape({
            name: PropTypes.string,
            forumName: PropTypes.string,
            forumId: PropTypes.number,
            cThread: PropTypes.number,
            anonymous: PropTypes.number,
            info: PropTypes.string,
            cElite: PropTypes.number,
            id: PropTypes.number
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
        getBoard: PropTypes.func.isRequired
    };

    componentWillMount() {
        const { getBoard, match } = this.props;
        getBoard(match.params.bid, 0, 'elite', '');
    }

    render () {
        const { isFetching, boardInfo, threadList } = this.props;
        if (isFetching || !boardInfo || !threadList) {
            return <FetchingOverlay fullPage/>;
        }

        const { name, cThread, info } = boardInfo;
        return (
            <Card title={name}>
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
        threadList: board.get('threadList')
    };
};
const mapDispatchToProps = dispatch => ({
    getBoard: (bid, page, type, order) => dispatch(getBoard(bid, page, type, order))
});

BoardWrapper = connect(mapStateToProps, mapDispatchToProps)(toJS(BoardWrapper));
export default BoardWrapper;
