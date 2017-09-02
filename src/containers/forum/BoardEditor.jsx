import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import InputField from '../../components/common/Input';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import { fetchNewThread } from '../../actions/forum/board';
import { connect } from 'react-redux';

import '../../styles/forum/editor.less';


const customToolbar = {
    options: ['inline', 'blockType', 'list', 'emoji', 'history'],
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
        onCloseModal: PropTypes.func.isRequired,
        newThread: PropTypes.func.isRequired,
        bid: PropTypes.number.isRequired
    };

    constructor () {
        super();
        this.state = {
            editorState: EditorState.createEmpty()
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
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

    handleTitleChange ({ target }) {
        this.setState({
            title: target.value
        });
    }

    handleSubmit (e) {
        e.preventDefault();
        const { newThread, bid } = this.props;
        const { editorState, title } = this.state;
        const mdContent = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));


        newThread(bid, title, mdContent);
    }

    render () {
        const { editorState, title } = this.state;
        return (
            <div>
                <Modal.Body>
                    <InputField
                        id="title"
                        text="标题"
                        placeholder="标题必须超过三个字"
                        value={title}
                        fullWidth
                        onChange={this.handleTitleChange}
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
                        type="submit"
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
        );
    }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
    newThread: (bid, title, content) => dispatch(fetchNewThread(bid, title, content))
});

BoardEditor = connect(mapStateToProps, mapDispatchToProps)(BoardEditor);
export default BoardEditor;
