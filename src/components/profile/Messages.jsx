import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, FormControl, Modal } from 'react-bootstrap';
import { LoadingDots } from '../common/Loading';
import ThreadRenderer from '../forum/ThreadRenderer';
import Avatar from '../common/Avatar';
import Time from '../common/Time';

export class MessagePrivate extends React.Component {
    constructor() {
        super();
        this.state = {
            isShowReplyBox: false,
            replyValue: '',
            isShowDialog: false,
            isShowSuccessOverlay: false,
            dialogPage: 0,
        };

        this.handleClickReply = this.handleClickReply.bind(this);
        this.handleClickSendMessage = this.handleClickSendMessage.bind(this);
        this.handleReplyChange = this.handleReplyChange.bind(this);
        this.handleShowDialog = this.handleShowDialog.bind(this);
        this.handleHideDialog = this.handleHideDialog.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { privatePayload } = nextProps;
        if (
            privatePayload &&
            !privatePayload.isFetching &&
            privatePayload !== this.props.privatePayload
        ) {
            if (!privatePayload.error) {
                this.setState({
                    isShowSuccessOverlay: true,
                });
                setTimeout(() => {
                    this.setState({
                        isShowReplyBox: false,
                        replyValue: '',
                        isShowSuccessOverlay: false,
                    });
                }, 2000);
            }
        }
    }

    handleClickReply() {
        this.setState({
            isShowReplyBox: !this.state.isShowReplyBox,
        });
    }

    handleReplyChange(e) {
        this.setState({
            replyValue: e.target.value,
        });
    }

    handleClickSendMessage(e) {
        e.preventDefault();
        const { onSendPrivateMessage, authorId } = this.props;
        const { replyValue } = this.state;
        onSendPrivateMessage(authorId, replyValue);
    }

    handleShowDialog() {
        const { authorId, onGetDialog } = this.props;
        const { dialogPage } = this.state;
        onGetDialog(authorId, dialogPage);
        this.setState({
            isShowDialog: true,
        });
    }

    handleHideDialog() {
        this.setState({
            isShowDialog: false,
        });
    }

    render() {
        const {
            restInfo: { content },
            authorName,
            privatePayload,
            dialogState,
        } = this.props;
        const { isShowReplyBox, replyValue, isShowDialog, isShowSuccessOverlay } = this.state;

        return (
            <div className="message-private">
                <div>
                    <p>{content}</p>
                    <Button bsStyle="link" className="flat" onClick={this.handleClickReply}>
                        回复
                    </Button>
                    <Button bsStyle="link" className="flat" onClick={this.handleShowDialog}>
                        查看对话
                    </Button>
                </div>
                {isShowReplyBox && (
                    <Form inline className="reply-box">
                        {isShowSuccessOverlay && (
                            <div className="success-overlay">私信发送成功</div>
                        )}
                        <FormGroup>
                            <FormControl
                                type="text"
                                onChange={this.handleReplyChange}
                                value={replyValue}
                                placeholder="想对Ta说的话"
                            />
                        </FormGroup>{' '}
                        <Button
                            bsStyle="default"
                            type="submit"
                            onClick={this.handleClickSendMessage}
                        >
                            发送
                        </Button>
                        {privatePayload &&
                            privatePayload.error && <span>{privatePayload.error}</span>}
                        {privatePayload && privatePayload.isFetching && <LoadingDots />}
                    </Form>
                )}
                <Modal show={isShowDialog} onHide={this.handleHideDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            与{authorName}
                            的对话列表
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {dialogState &&
                            (dialogState.isFetching ? (
                                <LoadingDots />
                            ) : (
                                dialogState.items.map(dialogMessage => {
                                    const {
                                        tCreate,
                                        authorId,
                                        authorName,
                                        content,
                                    } = dialogMessage;
                                    return (
                                        <div className="clearfix dialog-wrapper">
                                            <div className="pull-left clearfix meta">
                                                <Avatar
                                                    className="pull-left avatar"
                                                    id={authorId}
                                                    name={authorName}
                                                    imageShape="square"
                                                />
                                                <div className="pull-left">
                                                    <p>{authorName}</p>
                                                    <p>
                                                        <Time
                                                            className="time text-muted"
                                                            timestamp={tCreate}
                                                        />
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="pull-left content">{content}</div>
                                        </div>
                                    );
                                })
                            ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleHideDialog}>关闭</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export const MessageDeleted = ({ content, isThread }) => {
    const { title, floor, threadTitle, threadId, content: threadContent } = content;

    if (isThread)
        return (
            <p>
                删除您发表的主题贴 <strong>{title}</strong>
            </p>
        );
    return (
        <div className="message-delete">
            <p className="text-muted">
                删除了主题贴 <Link to={`/forum/thread/${threadId}/page/1`}>{threadTitle}</Link> 中
            </p>
            <p>您在 #{floor} 的评论</p>
            <div className="thread-render-wrapper">
                <ThreadRenderer content={threadContent} />
            </div>
        </div>
    );
};

export const MessageReply = ({ content, isThread, selfUid, selfName }) => {
    const { threadTitle, threadId, content: threadContent, replyContent, status } = content;

    const renderDeletedOverlay = !status && (
        <div className="deleted-overlay">
            <p>此帖子已被原作者删除</p>
            <p>
                <Link to={`/forum/thread/${threadId}/page/1`}>跳转到原帖链接</Link>
            </p>
        </div>
    );

    if (isThread) {
        return (
            <div className="message-reply-thread">
                {renderDeletedOverlay}
                <p>
                    回复了您的主题贴{' '}
                    <Link to={`/forum/thread/${threadId}/page/1`}>{threadTitle}</Link>
                </p>
                <ThreadRenderer content={threadContent} />
            </div>
        );
    }
    return (
        <div className="message-reply-post">
            {renderDeletedOverlay}
            <div className="replied-content">
                <p>
                    在主题贴 <Link to={`/forum/thread/${threadId}/page/1`}>{threadTitle}</Link>{' '}
                    中回复了您的评论
                </p>
                <ThreadRenderer content={threadContent} />
            </div>
            <Avatar className="pull-left message-author-avatar" id={selfUid} />
            <p className="message-author">
                {selfName}
                （您）
            </p>
            <div className="reply-content">
                <p>您的原文</p>
                <ThreadRenderer content={replyContent} />
            </div>
        </div>
    );
};

export const MessageMentioned = ({ content }) => {
    const { threadTitle, content: threadContent, threadId } = content;
    return (
        <div>
            <p>
                在主题贴
                <Link to={`/forum/thread/${threadId}/page/1`}>{threadTitle}</Link>
                中提到了您
            </p>
            <ThreadRenderer content={threadContent} />
        </div>
    );
};
