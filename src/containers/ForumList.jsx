import React from 'react';
import PropTypes from 'prop-types';
import { getForumList } from '../actions/forumList';
import { connect } from 'react-redux';
import { toJS } from '../utils/to-js';
import ForumList from '../components/ForumList';


class ForumListWrapper extends React.Component {
    static propTypes = {
        getForumList: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.getForumList();
    }

    render () {
        const { isFetching, items } = this.props;

        return (
            <ForumList
                isFetching={isFetching}
                forums={items} />
        ); 
    }
}


const mapStateToProps = (state) => {
    return {
        isFetching: state.getIn(['forumList', 'isFetching']),
        items: state.getIn(['forumList', 'items']),
        reachTime: state.getIn(['forumList', 'reachTime'])
    };
};


ForumListWrapper = connect(mapStateToProps, {
    getForumList
})(toJS(ForumListWrapper));
export default ForumListWrapper;
