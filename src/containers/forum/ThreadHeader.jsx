import React from 'react';
import PropTypes from 'prop-types';
import { Media, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import Time from '../../components/common/Time';
import Avatar from '../../components/common/Avatar';
import ThreadRenderer from '../../components/forum/ThreadRenderer';
import Sharing from '../../components/common/Sharing';
import SwitchButton from './SwitchButton';
import { showToast } from '../../actions/common/toast';
import { deleteThread } from '../../actions/forum/board';
import { connect } from 'react-redux';
import { toJS } from '../../util';

import '../../styles/forum/thread.less';


class ThreadHeader extends React.Component {
    static propTypes = {
        thread: PropTypes.shape({
            cPost: PropTypes.number,
            authorId: PropTypes.number,
            blocked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
            anonymous: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
            visibility: PropTypes.number,
            tModify: PropTypes.number,
            tCreate: PropTypes.number,
            authorName: PropTypes.string,
            like: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
            title: PropTypes.string,
            content: PropTypes.string,
            authorNickname: PropTypes.string,
            id: PropTypes.number
        }).isRequired,
        board: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            forumId: PropTypes.number,
            forumName: PropTypes.string
        }),
        onClickReply: PropTypes.func.isRequired,
        deleteThread: PropTypes.func.isRequired,
        isFetching: PropTypes.bool,
        success: PropTypes.string,
        error: PropTypes.string,
        selfUid: PropTypes.number,
        showToast: PropTypes.func.isRequired
    }

    constructor () {
        super();

        this.handleDeleteThread = this.handleDeleteThread.bind(this);
        this._renderUserName = this._renderUserName.bind(this);
    }

    handleDeleteThread () {
        const { deleteThread, thread: { id: tid } } = this.props;
        deleteThread && deleteThread(tid);
    }

    componentWillReceiveProps (nextProps) {
        const { isFetching, error, showToast, board: { id: bid } } = nextProps;
        if (!isFetching && isFetching !== this.props.isFetching) {
            if (error) {
                showToast(error);
            } else {
                // success
                // go back to board
                this.props.history.replace(`/forum/board/${bid}/page/1`);
            }
        }
    }

    _renderUserName () {
        const { thread: { anonymous, authorId, authorName, authorNickname } } = this.props;
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

    render () {
        const { thread: { id: tid, authorId, authorName, title, anonymous,
            tCreate, content, inCollection, like, liked 
        }, 
        board: { id, name }, selfUid
        } = this.props;

        return (
            <div className="thread-head">
                <Media className="thread-meta">
                    <Media.Left>
                        <Avatar
                            className="author-avatar"
                            id={authorId}
                            name={authorName}
                            anonymous={anonymous}
                        />
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading className="thread-title">
                            <Link to={`/forum/board/${id}/page/1`}>[{name}]</Link>
                            {title}
                        </Media.Heading>
                        <p>
                            {this._renderUserName()}
                            <span className="floor text-muted pull-right">#1</span>
                            <Time className="text-muted pull-right" timestamp={tCreate} />
                        </p>
                    </Media.Body>
                </Media>
                <ThreadRenderer content={content} />
                <div className="clearfix">
                    <Sharing
                        className="pull-left"
                        title={title}
                        url={window.location.href}
                        sites={['wechat', 'qq', 'douban', 'weibo']}
                    />
                    <div className="thread-buttons pull-right">
                        <SwitchButton
                            switchType="collect"
                            id={tid}
                            initialState={inCollection}
                        >
                            {(active, onClickButton) => {
                                return <Button bsStyle="link" className="flat" onClick={onClickButton}>
                                    {active ? '已收藏' : '收藏'}
                                </Button>;
                            }}
                        </SwitchButton>
                        <SwitchButton
                            switchType="likeThread"
                            id={tid}
                            initialState={liked}
                        >
                            {(active, onClickButton) => {
                                return <Button bsStyle="link" className="flat" onClick={onClickButton}>
                                    {active ? '已赞' : '点赞'}
                                    {like ? `（${like}）` : null}
                                </Button>;
                            }}
                        </SwitchButton>
                        {authorId === selfUid
                            ? (
                                <Button 
                                    bsStyle="link" 
                                    className="flat" 
                                    onClick={this.handleDeleteThread}
                                >
                                    删除
                                </Button>
                            )
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }
} 


const mapStateToProps = state => {
    const deleteThreadState = state.getIn(['bypassing', 'deleteThread']);
    const selfUid = state.getIn(['user', 'uid']);
    if (!deleteThreadState) return {};

    return {
        selfUid: selfUid,
        isFetching: deleteThreadState.get('isFetching'),
        success: deleteThreadState.get('items'),
        error: deleteThreadState.get('error')
    };
};
const mapDispatchToProps = dispatch => ({
    deleteThread: tid => dispatch(deleteThread(tid)),
    showToast: message => dispatch(showToast(message))
});
ThreadHeader = connect(mapStateToProps, mapDispatchToProps)(toJS(ThreadHeader));
ThreadHeader = withRouter(ThreadHeader);

export default ThreadHeader;
