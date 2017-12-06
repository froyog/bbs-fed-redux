import React from 'react';
import PropTypes from 'prop-types';
import Time from '../../components/common/Time';
import Avatar from '../../components/common/Avatar';
import { MessagePrivate } from '../../components/profile/Messages';


class MessageBase extends React.Component {
    constructor () {
        super();
        
        this._mapTagToTitle = this._mapTagToTitle.bind(this);
        this._mapTagToContent = this._mapTagToContent.bind(this);
    }
    
    _mapTagToTitle (tag) {
        switch (tag) {
            case 1: return '接收到私信';
            case 2: 
            case 3: return '帖子被回复';
            case 4: return '接收到好友申请';
            case 10:
            case 11: return '在帖子中被提到';
            default: return '接收到一条消息';
        }
    }

    _mapTagToContent (tag, content) {
        const { message: { authorName, authorId }, getDialog, sendPrivateMessage } = this.props;
        switch (tag) {
            case 1:
                return (
                    <MessagePrivate 
                        restInfo={content} 
                        authorName={authorName}
                        authorId={authorId}
                        onGetDialog={getDialog}
                        onSendPrivateMessage={sendPrivateMessage}
                    />
                );
            default: break;
        }
    }

    render () {
        const { message: { tag, authorId, authorName, authorNickname,
            read, tCreate, ...restMessageInfo } } = this.props;
        const messageTitle = this._mapTagToTitle(tag),
            messageContent = this._mapTagToContent(tag, restMessageInfo);

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

const mapStateToProps = () => {

};
const mapDispatchToProps = dispatch => ({
    getDialog: (page, authorId) => dispatch(getDialog(page, authorId)),
    sendPrivateMessage: (authorId, content) => dispatch(sendPrivateMessage(authorId, content))
});

export default MessageBase;