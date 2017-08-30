import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

let renderer = new marked.Renderer();
renderer.image = (href, title, text) => {
    let fullUri = `https://bbs.tju.edu.cn/api/img/${href.substring(7)}`;
    return (`
        <a href="${fullUri}" target="_blank">
            <img src="${fullUri}" alt="" title="${title}" />
        </a>
    `);
};
marked.setOptions({
    renderer: renderer,
    sanitize: true
});


class ThreadRenderer extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string.isRequired
    };

    render () {
        const { content } = this.props;
        if (!content) return null;

        const markdownContent = marked(content);
        return (
            <article
                className="thread-renderer"
                dangerouslySetInnerHTML={{__html: markdownContent}} />
        );
    }
};

export default ThreadRenderer;
