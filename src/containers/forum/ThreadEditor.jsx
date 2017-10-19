import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Card } from '../../components/common/Card';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import ThreadRenderer from '../../components/forum/ThreadRenderer';
import draftToMarkdown from 'draftjs-to-markdown';
import Attach from './Attach';

import '../../styles/forum/editor.less';


const customToolbar = {
    options: ['inline', 'blockType', 'list', 'link', 'emoji', 'history'],
    inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace']
    },
    list: {
        options: ['unordered', 'ordered']
    },
    image: {
        alignmentEnabled: false
    }
};


class ThreadEditor extends React.Component {
    static propTypes = {
        replyContent: PropTypes.string.isRequired,
        onCancelReply: PropTypes.func.isRequired
    };

    constructor () {
        super();
        this.state = {
            editorState: EditorState.createEmpty(),
        };

        this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancelReply = this.handleCancelReply.bind(this);
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

    handleCancelReply () {
        const { onCancelReply } = this.props;
        if (onCancelReply) onCancelReply();
    }

    render () {
        const { editorState } = this.state;
        const { replyContent } = this.props;

        return (
            <Card className="card-thread-editor">
                <Editor
                    toolbar={customToolbar}
                    toolbarCustomButtons={[<Attach />]}
                    editorState={editorState}
                    onEditorStateChange={this.handleEditorStateChange}
                    localization={{ locale: 'zh' }}
                    customDecorators={[]}
                />
                { replyContent &&
                    <div className="reply">
                        <Button
                            bsStyle="link"
                            className="flat"
                            onClick={this.handleCancelReply}
                        >
                            取消回复
                        </Button>
                        <ThreadRenderer content={replyContent} />
                    </div>
                }
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
