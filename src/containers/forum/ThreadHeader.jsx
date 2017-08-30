import React from 'react';
import PropTypes from 'prop-types';
import { Media, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Time from '../../components/common/Time';
import Avatar from '../../components/common/Avatar';

import '../../styles/forum/thread.less';


let ThreadHeader = ({ thread, board }) => {
    const { authorId, authorName, title, authorNickname, tCreate, content } = thread;
    const { id, name } = board;
    console.log(content);

    const handleImage = uri => {
        return `https://bbs.tju.edu.cn/api/img/${uri.substring(7)}`;
    };
    return (
        <div className="thread-head">
            <Media className="thread-meta">
                <Media.Left>
                    <Avatar
                        className="author-avatar"
                        id={authorId}
                        name={authorName} />
                </Media.Left>
                <Media.Body>
                    <Media.Heading className="thread-title">
                        <Link to={`/forum/board/${id}/page/1`}>[{name}]</Link>
                        {title}
                    </Media.Heading>
                    <p>
                        <Link to={`/user/${authorId}`}>{authorName}</Link>
                        <span className="text-muted">（{authorNickname}）</span>
                        <span className="floor text-muted pull-right">#1</span>
                        <Time className="text-muted pull-right" timestamp={tCreate} />
                    </p>
                </Media.Body>
            </Media>
            <ReactMarkdown
                className="thread-renderer"
                source={content}
                transformImageUri={handleImage} />
            {/*<ThreadRenderer />*/}
        </div>
    );
};

ThreadHeader.propTypes = {
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
    })
};

export default ThreadHeader;
