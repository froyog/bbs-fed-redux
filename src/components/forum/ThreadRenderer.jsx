import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

let renderer = new marked.Renderer();
renderer.image = (href, title, text) => {
    let fullUri = `https://bbs.tju.edu.cn/api/img/${href.substring(7)}`;
    // be careful with the "class" property.
    // it's not jsx
    return (`
        <a class="img-link" href="${fullUri}" target="_blank">
            <img src="${fullUri}" alt="Thread Image" />
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
