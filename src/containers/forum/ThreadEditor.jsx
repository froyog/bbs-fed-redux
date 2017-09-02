import React from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Card } from '../../components/common/Card';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';

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


class ThreadEditor extends React.Component {
    constructor () {
        super();
        this.state = {
            editorState: EditorState.createEmpty()
        };

        this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEditorStateChange (editorState) {
        this.setState({
            editorState
        });
    }

    handleSubmit (e) {
        // fetch goes here;
        e.preventDefault();
        const { editorState } = this.state;
        const rawMd = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
        console.log(rawMd);
    }

    render () {
        const { editorState } = this.state;
        return (
            <Card>
                <Editor
                    toolbar={customToolbar}
                    editorState={editorState}
                    onEditorStateChange={this.handleEditorStateChange}
                    localization={{
                        locale: 'zh'
                    }}
                    mention={customAt}
                />
                <Button
                    type="submit"
                    className="raised"
                    bsStyle="primary"
                    onClick={this.handleSubmit}
                >
                    发表回复
                </Button>
            </Card>
        );
    }
}

export default ThreadEditor;
