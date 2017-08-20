import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBoard } from '../../actions/board';
import { toJS } from '../../utils/to-js';


class BoardWrapper extends React.Component {
    componentDidMount() {
        this.props.getBoard(this.props.match.params.bid, 0)
    }

    render () {
        return (
            <p>{this.props.match.params.bid}</p>
        )
    }
}


// const mapStateToProps = (state, ownProps) => {
//     const bid = ownProps.match.params.bid;
//     const page = 0;
//     const board = state.getIn(['board', bid, page]);
//
//     return {
//         isFetching: board.get('isFetching'),
//         boardInfo: board.get('boardInfo'),
//         threads: board.get('threads')
//     };
// };
const mapDispatchToProps = dispatch => ({
    getBoard: (bid, page) => dispatch(getBoard(bid, page))
});

BoardWrapper = connect(null, mapDispatchToProps)(toJS(BoardWrapper));
export default BoardWrapper;
