import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';


class ThreadRenderer extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string.isRequired
    };

    constructor () {
        super();
        this.handleImageUri = this.handleImageUri.bind(this);
    }

    transformImageUri (uri) {
        return `https://bbs.tju.edu.cn/api/img/${uri.substring(7)}`;
    }

    render () {
        const { content } = this.props;
        return (
            <ReactMarkdown
                className="thread-renderer"
                source={content}
                transformImageUri={this.transformImageUri} />
        );
    }
};

export default ThreadRenderer;
