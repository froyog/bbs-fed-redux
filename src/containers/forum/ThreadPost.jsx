import React from 'react';
import PropTypes from 'prop-types';
import { Media, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/common/Avatar';
import Time from '../../components/common/Time';
import ThreadRenderer from '../../components/forum/ThreadRenderer';


const ThreadPost = ({ post, onClickReply }) => {
    const { authorId, authorName, authorNickname, floor, anonymous, tCreate, content } = post;

    const processContent = (content) => {
        let processedContent = content.replace(/^(?:>[ ]*){2}.*/gm, '');
        processedContent = processedContent.replace(/^(?:>[ ]*)+[ ]*(\n|$)/gm, '');
        processedContent = processedContent.substr(0, 180).trim();
        return processedContent;
    };

    const handleClickReply = () => {
        // process content fit length and add blockquote
        const processedContent = processContent(content);
        const replyContent = `回复 #${floor} ${authorName}：\n\n${processedContent}`.replace(/^/gm, '> ').trim();
        onClickReply(replyContent);
        // scroll to the bottom of the page
        window.scrollTo(0, document.body.scrollHeight);
    };

    const renderUserName = () => {
        if (anonymous) {
            if (!authorId) {
                // others, render anonymous user name
                return <span>匿名用户</span>;
            }
            // anonymous but authorId exists, me
            return <span>匿名用户（您）</span>
        } 
        return (
            <span className="text-muted">
                <Link to={`/user/${authorId}`}>{authorName}</Link>
                （{authorNickname}）
            </span>
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
                        {renderUserName()}
                        <span className="floor text-muted pull-right">#{floor}</span>
                        <Time className="text-muted pull-right" timestamp={tCreate} />
                    </p>
                    <ThreadRenderer content={content} />
                </Media.Body>
                <footer>
                    <Button
                        bsStyle="link"
                        className="flat"
                        onClick={handleClickReply}
                    >
                        回复
                    </Button>
                    <Button bsStyle="link" className="flat">编辑</Button>
                    <Button bsStyle="link" className="flat">删除</Button>
                </footer>
            </Media>
        </div>
    );
};

ThreadPost.propTypes = {
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
    onClickReply: PropTypes.func.isRequired
};
export default ThreadPost;
