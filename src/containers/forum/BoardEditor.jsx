import React from 'react'
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import InputField from '../../components/common/Input';
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


class BoardEditor extends React.Component {
    static propTypes = {
        onCloseModal: PropTypes.func.isRequired
    };

    constructor () {
        super();
        this.state = {
            editorState: EditorState.createEmpty()
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCloseModal () {
        const { onCloseModal } = this.props;
        onCloseModal && onCloseModal();
    }

    handleEditorStateChange (editorState) {
        this.setState({
            editorState
        });
    }

    handleSubmit () {
        // fetch goes here
        const { editorState } = this.state;
        const rawMd = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
        console.log(rawMd);
    }

    render () {
        const { editorState } = this.state;
        return (
            <div>
                <Modal.Body>
                    <InputField
                        id="title"
                        text="标题"
                        placeholder="标题必须超过三个字"
                        fullWidth
                    />
                <Editor
                        toolbar={customToolbar}
                        editorState={editorState}
                        onEditorStateChange={this.handleEditorStateChange}
                        localization={{
                            locale: 'zh'
                        }}
                        mention={customAt}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        bsStyle="primary"
                        onClick={this.handleSubmit}
                        className="raised pull-left"
                    >
                        发表
                    </Button>
                    <Button
                        bsStyle="danger"
                        onClick={this.handleCloseModal}
                        className="raised"
                    >
                        关闭
                    </Button>
                </Modal.Footer>
            </div>
        )
    }
}

export default BoardEditor;
