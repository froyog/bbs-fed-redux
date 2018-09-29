import React from 'react';
import PropTypes from 'prop-types';
import { SelectField } from '../../components/common/Input';
import { connect } from 'react-redux';
import { toJS } from '../../util';
import { getForumList, getBoardList } from '../../actions/forumList';
import { withRouter } from 'react-router-dom';

class BIDSelector extends React.Component {
    static PropsTypes = {
        onBIDSelect: PropTypes.func.isRequired,
        forumList: PropTypes.array,
        boardList: PropTypes.array,
        forumIsFetching: PropTypes.bool,
    };

    constructor() {
        super();
        this.state = {
            selectedForumId: 0,
            selectedBoardId: 0,
        };

        this.handleSelectForum = this.handleSelectForum.bind(this);
        this.handleSelectBoard = this.handleSelectBoard.bind(this);
    }

    componentDidMount() {
        const { getForumList, currentBoardInfo, onBIDSelect } = this.props;
        getForumList && getForumList();
        if (currentBoardInfo) {
            const { id } = currentBoardInfo;
            onBIDSelect && onBIDSelect(id);
        }
    }

    handleSelectForum(selectedForumId) {
        this.props.getBoardList(selectedForumId);
        this.setState({
            selectedForumId: selectedForumId,
        });
    }

    handleSelectBoard(selectedBoardId) {
        this.props.onBIDSelect(selectedBoardId);
    }

    render() {
        const { forumList, boardList, currentBoardInfo } = this.props;
        const { selectedForumId } = this.state;
        let forumOptions, initialForumName, initialBoardName;
        forumOptions =
            forumList &&
            forumList.map(forum => ({
                name: forum.name,
                id: forum.id,
            }));
        let boardOptions;

        if (boardList[selectedForumId] && boardList[selectedForumId].items.boards) {
            boardOptions = boardList[selectedForumId].items.boards.map(board => ({
                name: board.name,
                id: board.id,
            }));
        }
        if (currentBoardInfo) {
            initialForumName = currentBoardInfo.forumName;
            initialBoardName = currentBoardInfo.name;
        }

        return (
            <div>
                <SelectField
                    labelText="选择分区"
                    options={forumOptions}
                    onSelect={this.handleSelectForum}
                    initialValue={initialForumName}
                />
                <SelectField
                    labelText="选择板块"
                    options={boardOptions}
                    onSelect={this.handleSelectBoard}
                    initialValue={initialBoardName}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    forumIsFetching: state.getIn(['forumList', 'isFetching']),
    forumList: state.getIn(['forumList', 'items']),
    boardList: state.get('boardList'),
});
const mapDispatchToProps = dispatch => ({
    getForumList: () => dispatch(getForumList()),
    getBoardList: fid => dispatch(getBoardList(fid)),
});
BIDSelector = connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(BIDSelector));
BIDSelector = withRouter(BIDSelector);

export default BIDSelector;
