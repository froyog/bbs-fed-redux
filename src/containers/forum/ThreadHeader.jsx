import React from 'react';
import PropTypes from 'prop-types';
import { Media, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { InputField } from '../../components/common/Input';
import Time from '../../components/common/Time';
import Avatar from '../../components/common/Avatar';
import ThreadRenderer from '../../components/forum/ThreadRenderer';
import Sharing from '../../components/common/Sharing';
import SwitchButton from './SwitchButton';
import { showToast } from '../../actions/common/toast';
import { deleteThread, editThread } from '../../actions/forum/board';
import { connect } from 'react-redux';
import { toJS, customToolbar, 
    markdownToDraft, draftToMarkdown,
    isAuthorOf, isModeratorOf
} from '../../util';

// editor
import { getDecorator } from './editor/mention.js';
import Attach from './editor/Attach';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';


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

    constructor (props) {
        super(props);
        this.state = {
            isEditing: false,
            title: props.thread.title,
            editorState: EditorState.createWithContent(
                convertFromRaw(markdownToDraft(props.thread.content))
            )
        };

        this._renderUserName = this._renderUserName.bind(this);
        this.handleClickOperator = this.handleClickOperator.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
        this.getEditorState = this.getEditorState.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
        this.handleConfirmEdit = this.handleConfirmEdit.bind(this);
    }

    handleClickOperator (eventKey) {
        const { deleteThread, thread: { id: tid } } = this.props;
        switch (eventKey) {
            case 'delete':
                deleteThread && deleteThread(tid);
                break;
            case 'edit':
                this.setState({
                    isEditing: true
                });
                break;
            default:
                break;
        }
    }

    handleCancelEdit () {
        this.setState({
            isEditing: false
        });
    }

    handleConfirmEdit (e) {
        e.preventDefault();
        const { editThread, thread: { id: tid } } = this.props;
        const { title, editorState } = this.state;
        const mdContent = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));

        editThread(tid, title, mdContent);
    }

    handleChangeTitle ({ target }) {
        const { id, value } = target;
        this.setState({
            [id]: value
        });
    }

    handleEditorStateChange (editorState) {
        this.setState({
            editorState
        });
    }

    componentWillReceiveProps (nextProps) {
        const { isFetching, error, showToast, board: { id: bid }, editThreadState } = nextProps;
        if (!isFetching && isFetching !== this.props.isFetching) {
            if (error) {
                showToast(error);
            } else {
                // success
                // go back to board
                this.props.history.replace(`/forum/board/${bid}/page/1`);
            }
        }
        if (
            !editThreadState.isFetching &&
            editThreadState.isFetching !== this.props.editThreadState.isFetching &&
            !editThreadState.error
        ) {
            this.props.onEditSuccess(1);
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

    getEditorState () {
        return this.state.editorState;        
    }

    render () {
        const { thread: { id: tid, authorId, authorName, title, anonymous,
            tCreate, content, inCollection, like, liked 
        }, 
        board: { id: bid, name, forumId: fid },
        selfUid, selfGroup, selfModerate, editThreadState
        } = this.props;

        const { isEditing, editorState } = this.state;

        const isAuthor = isAuthorOf(authorId, selfUid);
        const isModerator = isModeratorOf(selfModerate, selfGroup, bid, fid);
        const renderOperatorDropDown = (
            <DropdownButton
                className="operator-dropdown flat"
                bsStyle="link"
                title="权限"
                id="operator-dropdown"
                pullRight
            >   
                <MenuItem header>作者</MenuItem>
                <MenuItem 
                    eventKey="edit" 
                    onSelect={this.handleClickOperator}
                    disabled={!isAuthor}
                >
                        编辑
                </MenuItem>
                <MenuItem 
                    eventKey="delete" 
                    onSelect={this.handleClickOperator}
                    disabled={!isAuthor}
                >
                        删除
                </MenuItem>
                <MenuItem divider />
                <MenuItem header>管理员</MenuItem>
                <MenuItem eventKey="0" disabled>设为精华</MenuItem>
                <MenuItem 
                    eventKey="edit" 
                    disabled={!isModerator} 
                    onSelect={this.handleClickOperator}
                >
                        编辑
                </MenuItem>
                <MenuItem 
                    eventKey="delete" 
                    disabled={!isModerator}
                    onSelect={this.handleClickOperator}
                >
                        删除
                </MenuItem>
                <MenuItem eventKey="0" disabled>禁言此作者</MenuItem>
                <MenuItem eventKey="0" disabled>锁定</MenuItem>
                <MenuItem eventKey="0" disabled>移动至...</MenuItem>
            </DropdownButton>
        );

        const renderTitle = isEditing
            ? (
                <InputField 
                    text="标题"
                    id="edit-title"
                    onChange={this.handleChangeTitle}
                    placeholder="标题必须超过三个字"
                    initialValue={title}
                    fullWidth                    
                />
            )
            : (
                <Media.Heading className="thread-title">
                    <Link to={`/forum/board/${bid}/page/1`}>[{name}]</Link>
                    {title}
                </Media.Heading>
            );

        const renderContent = isEditing
            ? (
                <div>
                    <Editor 
                        toolbar={customToolbar}
                        toolbarCustomButtons={[<Attach />]}
                        editorState={editorState}
                        onEditorStateChange={this.handleEditorStateChange}
                        localization={{
                            locale: 'zh'
                        }}
                        placeholder="与天大分享你刚编的故事"
                        customDecorators={getDecorator(
                            this.getEditorState, 
                            this.handleEditorStateChange)
                        }
                    />
                    <Button 
                        bsStyle="primary"
                        className="raised edit-confirm-button"
                        onClick={this.handleConfirmEdit}
                        type="submit"
                        disabled={editThreadState.isFetching}
                    >
                        确定
                    </Button>
                    <Button 
                        bsStyle="default"
                        className="raised"
                        onClick={this.handleCancelEdit}
                    >
                        取消
                    </Button>
                    {
                        editThreadState.error &&
                        <p className="error-message">{editThreadState.error}</p>
                    }
                </div>
            )
            : <ThreadRenderer content={content} />;

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
                        {renderTitle}
                        <p>
                            {this._renderUserName()}
                            <span className="floor text-muted pull-right">#1</span>
                            <Time className="text-muted pull-right" timestamp={tCreate} />
                        </p>
                    </Media.Body>
                </Media>
                {renderContent}
                <div className="clearfix thread-footer">
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
                        {renderOperatorDropDown}
                    </div>
                </div>
            </div>
        );
    }
} 


const mapStateToProps = state => {
    const deleteThreadState = state.getIn(['bypassing', 'deleteThread']),
        editThreadState = state.getIn([ 'bypassing', 'editThread' ]);
    const selfUid = state.getIn(['user', 'uid']),
        selfModerate = state.getIn(['user', 'moderator']),
        selfGroup = state.getIn(['user', 'group']);
    if (!deleteThreadState) return {};

    return {
        selfUid,
        selfModerate,
        selfGroup,
        isFetching: deleteThreadState.get('isFetching'),
        success: deleteThreadState.get('items'),
        error: deleteThreadState.get('error'),
        editThreadState
    };
};
const mapDispatchToProps = dispatch => ({
    deleteThread: tid => dispatch(deleteThread(tid)),
    showToast: message => dispatch(showToast(message)),
    editThread: (tid, title, content) => dispatch(editThread(tid, title, content))
});
ThreadHeader = connect(mapStateToProps, mapDispatchToProps)(toJS(ThreadHeader));
ThreadHeader = withRouter(ThreadHeader);

export default ThreadHeader;
