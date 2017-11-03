import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

let renderer = new marked.Renderer();
renderer.image = (href, title, text) => {
    let fullUri;
    if (href.substring(0, 5) === 'https') {
        fullUri = href
    } else {
        fullUri = href.substring(7)
    }
    // be careful with the "class" property.
    // this is not jsx
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
                dangerouslySetInnerHTML={{__html: markdownContent}} 
            />
        );
    }
};

export default ThreadRenderer;
