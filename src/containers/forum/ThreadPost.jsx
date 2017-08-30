import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Avatar from '../../components/common/Avatar';
import Time from '../../components/common/Time';


const ThreadPost = ({ post }) => {
    const { authorId, authorName, authorNickname, floor, anonymous, tCreate,
            tModify, like, content, id } = post;
    const handleImage = (uri) => {

    };

    return (
        <div className="thread-head">
            <Media className="thread-meta">
                <Media.Left>
                    <Avatar
                        className="author-avatar post"
                        id={authorId}
                        name={authorName} />
                </Media.Left>
                <Media.Body>
                    <p className="post-meta">
                        <Link to={`/user/${authorId}`}>{authorName}</Link>
                        <span className="text-muted">（{authorNickname}）</span>
                        <span className="floor text-muted pull-right">#1</span>
                        <Time className="text-muted pull-right" timestamp={tCreate} />
                    </p>
                    <ReactMarkdown
                        className="thread-renderer"
                        source={content}
                        transformImageUri={handleImage} />
                </Media.Body>
            </Media>
            {/*<ThreadRenderer />*/}
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
    }).isRequired
};
export default ThreadPost;
