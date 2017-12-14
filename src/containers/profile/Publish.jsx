import React from 'react';
import PropTypes from 'prop-types';
import { PublishList, ReplyList } from '../../components/profile/Publish';
import { connect } from 'react-redux';
import { toJS } from '../../util';
import { getPublishList, getReplyList } from '../../actions/profile/publish';

class Publish extends React.Component {
    static propTypes = {
        getPublishList: PropTypes.func.isRequired,
        getReplyList: PropTypes.func.isRequired
    }

    constructor () {
        super();

        this.handleLoadMoreThread = this.handleLoadMoreThread.bind(this);
        this.handleLoadMorePost = this.handleLoadMorePost.bind(this);
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

    render () {
        const { publishState, replyState } = this.props;
        return (
            <div>
                <PublishList 
                    type="thread"
                    onLoadMorePage={this.handleLoadMoreThread}
                    publishState={publishState}
                />
                <PublishList
                    type="post" 
                    onLoadMorePage={this.handleLoadMorePost}
                    publishState={replyState}
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
        replyState: publishSliceState.get('post') 
    };
};
const mapDispatchToProps = dispatch => ({
    getPublishList: page => dispatch(getPublishList(page)),
    getReplyList: page => dispatch(getReplyList(page))
});
Publish = connect(mapStateToProps, mapDispatchToProps)(toJS(Publish));

export default Publish;