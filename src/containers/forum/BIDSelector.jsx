import React from 'react';
import PropTypes from 'prop-types';
import { SelectField } from '../../components/common/Input';
import { connect } from 'react-redux';
import { toJS } from '../../util';
import { getForumList, getBoardList } from '../../actions/forumList';


class BIDSelector extends React.Component {
    static PropsTypes = {
        onBIDSelect: PropTypes.func.isRequired,
        forumList: PropTypes.array,
        boardList: PropTypes.array,
        forumIsFetching: PropTypes.bool
    }

    constructor () {
        super();
        this.state = {
            selectedForumId: 0,
            selectedBoardId: 0
        };

        this.handleSelectForum = this.handleSelectForum.bind(this);
        this.handleSelectBoard = this.handleSelectBoard.bind(this);
    }

    componentDidMount () {
        this.props.getForumList();
    }

    handleSelectForum (selectedForumId) {
        this.props.getBoardList(selectedForumId);
        this.setState({
            selectedForumId: selectedForumId
        });
    }

    handleSelectBoard (selectedBoardId) {
        this.props.onBIDSelect(selectedBoardId);
    }

    render () {
        const { forumList, boardList } = this.props;
        const { selectedForumId } = this.state;
        let forumOptions;
        forumOptions = forumList && forumList.map(forum => ({
            name: forum.name,
            id: forum.id
        }));
        let boardOptions;
        if (boardList[selectedForumId] && boardList[selectedForumId].items.boards) {
            boardOptions = boardList[selectedForumId].items.boards.map(board => ({
                name: board.name,
                id: board.id
            }));
        }

        return (
            <div>
                <SelectField
                    labelText="选择分区"
                    options={forumOptions}
                    onSelect={this.handleSelectForum}
                />
                <SelectField
                    labelText="选择板块"
                    options={boardOptions}
                    onSelect={this.handleSelectBoard}
                />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        forumIsFetching: state.getIn(['forumList', 'isFetching']),
        forumList: state.getIn(['forumList', 'items']),
        boardList: state.getIn(['boardList'])
    };
};
const mapDispatchToProps = dispatch => ({
    getForumList: () => dispatch(getForumList()),
    getBoardList: fid => dispatch(getBoardList(fid))
});
BIDSelector = connect(mapStateToProps, mapDispatchToProps)(toJS(BIDSelector));

export default BIDSelector;