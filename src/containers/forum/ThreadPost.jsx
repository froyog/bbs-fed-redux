import React from 'react';
import PropTypes from 'prop-types';
import { Media, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/common/Avatar';
import Time from '../../components/common/Time';
import ThreadRenderer from '../../components/forum/ThreadRenderer';
import SwitchButton from './SwitchButton';
import { showToast } from '../../actions/common/toast';
import { deletePost } from '../../actions/forum/thread';
import { connect } from 'react-redux';
import { toJS, isAuthorOf, isModeratorOf } from '../../util';


class ThreadPost extends React.Component {
    static propTypes = {
        post: PropTypes.shape({
            authorId: PropTypes.number.isRequired,
            authorNickname: PropTypes.string.isRequired,
            floor: PropTypes.number.isRequired,
            anonymous: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
            tCreate: PropTypes.number.isRequired,
            tModify: PropTypes.number.isRequired,
            authorName: PropTypes.string.isRequired,
            like: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
            content: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired
        }).isRequired,
        onClickReply: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired,
        isFetching: PropTypes.bool,
        success: PropTypes.string,
        error: PropTypes.string,
        selfUid: PropTypes.number,
        showToast: PropTypes.func.isRequired
    }

    constructor () {
        super();

        this.handleClickReply = this.handleClickReply.bind(this);
        this._renderUserName = this._renderUserName.bind(this);
        this.handleDeletePost = this.handleDeletePost.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        const { isFetching, error, showToast, onDeleteSuccess } = nextProps;
        if (!isFetching && isFetching !== this.props.isFetching) {
            if (error) {
                showToast(error);
            } else {
                // success
                onDeleteSuccess();
            }
        }
    }

    _processContent (content) {
        let processedContent = content.replace(/^(?:>[ ]*){2}.*/gm, '');
        processedContent = processedContent.replace(/^(?:>[ ]*)+[ ]*(\n|$)/gm, '');
        processedContent = processedContent.substr(0, 180).trim();
        return processedContent;
    };

    _renderUserName () {
        const { post: { anonymous, authorId, authorName, authorNickname } } = this.props;
        if (anonymous) {
            if (!authorId) {
                // others, render anonymous user name
                return <span>匿名用户</span>;
            }
            // anonymous but authorId exists, me
            return <span>匿名用户（您）</span>;
        } 
        return (
            <span className="text-muted">
                <Link to={`/user/${authorId}`}>{authorName}</Link>
                <span className="author-nickname">（{authorNickname}）</span>
            </span>
        );
    }

    handleClickReply () {
        // process content fit length and add blockquote
        const { post: { id: replyId, content, floor, authorName } } = this.props;
        const processedContent = this._processContent(content);
        const replyContent = `回复 #${floor} ${authorName}：\n\n${processedContent}`.replace(/^/gm, '> ').trim();
        this.props.onClickReply(replyId, replyContent);
        // scroll to the bottom of the page
        window.scrollTo(0, document.body.scrollHeight);
    }

    handleDeletePost () {
        const { post: { id: pid }, deletePost } = this.props;
        deletePost && deletePost(pid);
    }
    
    render () {
        const { post: { id: pid, authorId, authorName, 
            floor, anonymous, tCreate, content, liked, like 
        },
        board: { boardId, forumId },
        selfUid, selfGroup, selfModerate
        } = this.props;
        let renderDeleteButton = null;
        if (
            isAuthorOf(authorId, selfUid) || 
            isModeratorOf(selfModerate, selfGroup, boardId, forumId)
        ) {
            renderDeleteButton = (
                <Button 
                    bsStyle="link" 
                    className="flat" 
                    onClick={this.handleDeletePost}
                >
                    删除
                </Button>
            );
        }
    
        return (
            <div className="thread-head">
                <Media className="thread-meta">
                    <Media.Left>
                        <Avatar
                            className="author-avatar post"
                            id={authorId}
                            name={authorName}
                            anonymous={anonymous} 
                        />
                    </Media.Left>
                    <Media.Body>
                        <p className="post-meta">
                            {this._renderUserName()}
                            <span className="floor text-muted pull-right">#{floor}</span>
                            <Time className="text-muted pull-right" timestamp={tCreate} />
                        </p>
                        <ThreadRenderer content={content} />
                    </Media.Body>
                    <footer>
                        <Button
                            bsStyle="link"
                            className="flat"
                            onClick={this.handleClickReply}
                        >
                        回复
                        </Button>
                        <SwitchButton
                            switchType="likePost"
                            id={pid}
                            initialState={liked}
                        >
                            {(active, onClickButton) => {
                                return <Button bsStyle="link" className="flat" onClick={onClickButton}>
                                    {active ? '已赞' : '点赞'}
                                    {like ? `（${like}）` : null}
                                </Button>;
                            }}
                        </SwitchButton>
                        {renderDeleteButton}
                    </footer>
                </Media>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const deletePostState = state.getIn(['bypassing', 'deletePost', ownProps.post.id]);
    const selfUid = state.getIn(['user', 'uid']),
          selfGroup = state.getIn(['user', 'group']),
          selfModerate = state.getIn(['user', 'moderator']);
    if (!deletePostState) return {
        selfUid,
        selfGroup,
        selfModerate
    };

    return {
        selfUid,
        selfGroup,
        selfModerate,
        isFetching: deletePostState.get('isFetching'),
        success: deletePostState.get('items'),
        error: deletePostState.get('error')
    };
};
const mapDispatchToProps = dispatch => ({
    deletePost: pid => dispatch(deletePost(pid)),
    showToast: message => dispatch(showToast(message))
});
ThreadPost = connect(mapStateToProps, mapDispatchToProps)(toJS(ThreadPost));

export default ThreadPost;
