import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Media } from 'react-bootstrap';
import Time from './Time';
import Avatar from './Avatar';

import '../../styles/common/forum.less';


const ThreadItem = ({ thread }) => {
    const { id, boardId, boardName, authorId, authorName,
            tReply, title, cPost, anonymous } = thread;

    return (
        <Media className="thread-item">
            <Media.Body>
                <Media.Heading>
                    <Link to={`/forum/board/${boardId}`}>[{boardName}]</Link>
                    &nbsp;
                    <Link to={`/forum/thread/${id}`} className="title-link">{title}</Link>
                </Media.Heading>
                <p>
                    {
                        anonymous
                            ? <span>匿名用户</span>
                            : <span>作者：<Link to={`/user/${authorId}`}>{authorName}</Link></span>
                    }
                    <span className="pipe">/</span>
                    <Time timestamp={tReply} />
                </p>
            </Media.Body>
            <Media.Right>
                <Avatar
                    id={authorId}
                    name={authorName}
                    className="avatar" />
                <Link to={`/forum/thread/${id}`} className="comments-count">
                    <i className="iconfont icon-comment"></i>{cPost}
                </Link>
            </Media.Right>
        </Media>
    );
};
ThreadItem.propTypes = {
    thread: PropTypes.shape({
        id: PropTypes.number.isRequired,
        boardId: PropTypes.number.isRequired,
        boardName: PropTypes.string.isRequired,
        authorId: PropTypes.number.isRequired,
        authorName: PropTypes.string.isRequired,
        tReply: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        cPost: PropTypes.number.isRequired,
        anonymous: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.bool
        ])
    }).isRequired
};

export default ThreadItem;
