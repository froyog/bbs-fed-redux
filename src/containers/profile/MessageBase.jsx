import React from 'react';
import PropTypes from 'prop-types';
import Time from '../../components/common/Time';
import Avatar from '../../components/common/Avatar';
import { MessagePrivate, MessageDeleted, MessageReply, MessageMentioned } from '../../components/profile/Messages';
import { connect } from 'react-redux';
import { toJS } from '../../util';

class MessageBase extends React.Component {
    constructor () {
        super();
        
        this._mapTagToTitle = this._mapTagToTitle.bind(this);
        this._mapTagToContent = this._mapTagToContent.bind(this);
    }
    
    _mapTagToTitle (tag) {
        switch (tag) {
            case 0: return '系统消息';
            case 1: return '接收到私信';
            case 2: 
            case 3: return '帖子被回复';
            case 4: return '接收到好友申请';
            case 10:
            case 11: return '在帖子中被提到';
            case 12: return '被封禁';
            case 13: return '取消封禁';
            case 100:
            case 110: return '帖子被删除';
            case 101:
            case 111: return '帖子被编辑';
            case 103: return '帖子被设为精华';
            case 104: return '帖子被移除精华';
            default: return '接收到一条消息';
        }
    }

    _mapTagToContent (tag) {
        const { message: { authorName, authorId, ...restInfo }, getDialog, 
            sendPrivateMessage } = this.props;
        switch (tag) {
            case 1:
                return (
                    <MessagePrivate 
                        restInfo={restInfo} 
                        authorName={authorName}
                        authorId={authorId}
                        onGetDialog={getDialog}
                        onSendPrivateMessage={sendPrivateMessage}
                    />
                );
            case 2:
            case 3:
                const { selfUid, selfName } = this.props;
                return (
                    <MessageReply 
                        content={restInfo.content}
                        isThread={ tag === 2 }
                        selfUid={selfUid}
                        selfName={selfName}
                    />
                );
            case 10:
            case 11:
                return (
                    <MessageMentioned 
                        content={restInfo.content}
                    />
                );
            case 100:
            case 110:
                return (
                    <MessageDeleted 
                        content={restInfo.content}
                        isThread={ tag === 100 }
                    />
                );
            default: break;
        }
    }

    render () {
        const { message: { tag, authorId, authorName, authorNickname,
            read, tCreate } } = this.props;
        const messageTitle = this._mapTagToTitle(tag),
            messageContent = this._mapTagToContent(tag);

        return (
            <div className="message-wrapper">
                <div className="clearfix">
                    <span className="title pull-left">
                        { messageTitle }
                        { !read && <small className="unread">[未读]</small> }
                    </span>
                    <Time className="message-time pull-right" timestamp={tCreate} />
                </div>
                <div>
                    <div className="meta clearfix">
                        <Avatar 
                            id={authorId}
                            name={authorName}
                            className="message-author-avatar pull-left"
                        />
                        <p className="message-author">{authorName}（{authorNickname}）</p>
                    </div>
                    {messageContent}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selfUid: state.getIn(['user', 'uid']),
        selfName: state.getIn(['user', 'username'])
    };
};
const mapDispatchToProps = dispatch => ({
    getDialog: (page, authorId) => dispatch(getDialog(page, authorId)),
    sendPrivateMessage: (authorId, content) => dispatch(sendPrivateMessage(authorId, content))
});
MessageBase = connect(mapStateToProps)(toJS(MessageBase));

export default MessageBase;