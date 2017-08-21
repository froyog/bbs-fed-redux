import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBoard } from '../../actions/board';
import Board from '../../components/forum/Board';
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
        threads: PropTypes.arrayOf(PropTypes.shape({
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
        getBoard(match.params.bid, 0);
    }

    render () {
        const { isFetching, boardInfo, threads } = this.props;
        if (isFetching || !boardInfo || !threads) return <FetchingOverlay fullPage/>
        return (
            <Board
                boardInfo={boardInfo}
                threads={threads} />
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const bid = ownProps.match.params.bid;
    const page = 0; //testing
    const board = state.getIn(['board', bid, page]);
    if (!board) return {};
    return {
        isFetching: board.get('isFetching'),
        boardInfo: board.get('boardInfo'),
        threads: board.get('threads')
    };
};
const mapDispatchToProps = dispatch => ({
    getBoard: (bid, page) => dispatch(getBoard(bid, page))
});

BoardWrapper = connect(mapStateToProps, mapDispatchToProps)(toJS(BoardWrapper));
export default BoardWrapper;
