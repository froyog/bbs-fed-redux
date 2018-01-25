import React from 'react';
import PropTypes from 'prop-types';
import { PublishList } from '../../components/profile/Publish';
import { connect } from 'react-redux';
import { toJS } from '../../util';
import { getPublishList, getReplyList } from '../../actions/profile/publish';
import { deleteThread } from '../../actions/forum/board';
import { deletePost } from '../../actions/forum/thread';


class Publish extends React.Component {
    static propTypes = {
        getPublishList: PropTypes.func.isRequired,
        getReplyList: PropTypes.func.isRequired
    }

    constructor () {
        super();

        this.handleLoadMoreThread = this.handleLoadMoreThread.bind(this);
        this.handleLoadMorePost = this.handleLoadMorePost.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        const { getPublishList, getReplyList } = nextProps;
        {
            const { isFetching, error } = nextProps.deleteThreadState;
            if (!error && !isFetching && 
                isFetching !== this.props.deleteThreadState.isFetching
            ) {
                getPublishList && getPublishList(0);
            }
        }
        {
            const { isFetching, error } = nextProps.deletePostState;
            if (!error && !isFetching 
                && isFetching !== this.props.deletePostState.isFetching
            ) {
                getReplyList && getReplyList(0);
            }
        }
    }

    componentWillMount () {
        const { getPublishList, getReplyList } = this.props;
        getPublishList && getPublishList(0);
        getReplyList && getReplyList(0);
    }

    handleLoadMoreThread (page) {
        const { getPublishList } = this.props;
        getPublishList && getPublishList(page);
    }

    handleLoadMorePost (page) {
        const { getReplyList } = this.props;
        getReplyList && getReplyList(page);
    }

    handleDelete (type, id) {
        const { deleteThread, deletePost } = this.props;
        if (type === 'thread') {
            // tid
            deleteThread && deleteThread(id);
        } else if (type === 'post') {
            // pid
            deletePost && deletePost(id);
        }
    }

    render () {
        const { publishState, replyState } = this.props;
        return (
            <div>
                <PublishList 
                    type="thread"
                    onLoadMorePage={this.handleLoadMoreThread}
                    publishState={publishState}
                    onDelete={this.handleDelete}
                />
                <PublishList
                    type="post" 
                    onLoadMorePage={this.handleLoadMorePost}
                    publishState={replyState}
                    onDelete={this.handleDelete}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const publishSliceState = state.get('publish');
    if (!publishSliceState) return;

    return {
        publishState: publishSliceState.get('thread'),
        replyState: publishSliceState.get('post'),
        deleteThreadState: state.getIn(['bypassing', 'deleteThread']),
        deletePostState: state.getIn(['bypassing', 'deletePost'])
    };
};
const mapDispatchToProps = dispatch => ({
    getPublishList: page => dispatch(getPublishList(page)),
    getReplyList: page => dispatch(getReplyList(page)),
    deleteThread: tid => dispatch(deleteThread(tid)),
    deletePost: pid => dispatch(deletePost(pid))
});
Publish = connect(mapStateToProps, mapDispatchToProps)(toJS(Publish));

export default Publish;