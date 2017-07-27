import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBoardList } from '../actions/forumList';
import { toJS } from '../utils/to-js';
import Forum from '../components/Forum';


let ForumWrapper = props => {
    const { info, getBoardList,
            isFetching, items } = props;
    return (
        <Forum
            isFetching={isFetching}
            basicInfo={info}
            detailedInfo={items}
            onGetDetail={(fid) => {
                getBoardList(fid);
            }}
        />
    );
};

ForumWrapper.propTypes = {
    info: PropTypes.shape({
        name: PropTypes.string.isRequired,
        info: PropTypes.string.isRequired,
        cBoard: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired
    }).isRequired,
    getBoardList: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    items: PropTypes.shape({
        boards: PropTypes.array,
        forum: PropTypes.object
    })
};

const mapStateToProps = (state, ownProps) => {
    const fid = ownProps.info.id;
    const detailedInfo = state.getIn(['boardList', fid]);
    if (!detailedInfo) return {};
    return {
        isFetching: detailedInfo.get('isFetching'),
        items: detailedInfo.get('items')
    };
};


ForumWrapper = connect(mapStateToProps, {
    getBoardList
})(toJS(ForumWrapper));
export default ForumWrapper;
