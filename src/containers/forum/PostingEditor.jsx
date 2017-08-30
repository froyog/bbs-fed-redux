import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import draftToMarkDown from 'draftjs-to-markdown';


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
            <div>
                <Editor
                    wrapperClassName=""
                    editorClassName=""
                    toolbar={{
                        inline: {},
                        list: {},
                        link: {}
                    }}
                    editorState={editorState}
                    onEditorStateChange={this.handleEditorStateChange}/>
                <textarea
                    disabled
                    value={ editorState &&
                        draftToMarkDown(convertToRaw(editorState.getCurrentContent()))
                    } />
            </div>
        );
    }
}

export default PostingEditor;
