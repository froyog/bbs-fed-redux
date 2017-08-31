import React from 'react';
// import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
// import draftToMarkDown from 'draftjs-to-markdown';

import '../../styles/forum/editor.less';


const customToolbar = {
    options: ['inline', 'blockType', 'list', 'link', 'emoji', 'history'],
    inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace']
    },
    list: {
        options: ['unordered', 'ordered']
    }
};

const customAt = {
    separator: ' ',
    trigger: '@',
    suggestions: [
        { text: 'APPLE', value: 'apple', url: 'apple' },
        { text: 'BANANA', value: 'banana', url: 'banana' },
        { text: 'CHERRY', value: 'cherry', url: 'cherry' },
        { text: 'DURIAN', value: 'durian', url: 'durian' },
        { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
        { text: 'FIG', value: 'fig', url: 'fig' },
        { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
        { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
    ]
};


class PostingEditor extends React.Component {
    constructor () {
        super();
        this.state = {
            editorState: EditorState.createEmpty()
        };

        this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
    }

    handleEditorStateChange (editorState) {
        this.setState({
            editorState
        });
    }

    render () {
        const { editorState } = this.state;
        return (
            <Editor
                toolbar={customToolbar}
                editorState={editorState}
                onEditorStateChange={this.handleEditorStateChange}
                localization={{
                    locale: 'zh'
                }}
                mention={customAt}
            />
        );
    }
}

export default PostingEditor;
