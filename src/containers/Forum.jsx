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


const mapStateToProps = (state, ownProps) => {
    const fid = ownProps.info.id;
    const detailedInfo = state.getIn(['boardList', ''+fid]);
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
