import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { InputField } from '../../components/common/Input';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import { fetchNewThread } from '../../actions/forum/board';
import { connect } from 'react-redux';
import Attach from './Attach';
import BIDSelector from './BIDSelector';

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


class BoardEditor extends React.Component {
    static propTypes = {
        onCloseModal: PropTypes.func.isRequired,
        newThread: PropTypes.func.isRequired,
        bid: PropTypes.number
    };

    constructor () {
        super();
        this.state = {
            editorState: EditorState.createEmpty(),
            bid: 0
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSelectBID = this.handleSelectBID.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        const { tid, error, isFetching, history } = nextProps;

        if (tid && !error && !isFetching) {
            // success
            this.handleCloseModal();
            history.push(`/forum/thread/${tid}/page/1`);
        }
    }

    handleCloseModal () {
        const { onCloseModal } = this.props;
        if (onCloseModal) onCloseModal();
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

    handleSelectBID (bid) {
        this.setState({
            bid: bid
        });
    }

    handleSubmit (e) {
        e.preventDefault();
        const { newThread } = this.props;
        const { editorState, title } = this.state;
        const mdContent = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));

        const { bid } = this.state;
        newThread(bid, title, mdContent);
    }
    
    render () {
        const { editorState, title } = this.state;
        const { isFetching } = this.props;

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
                    <BIDSelector onBIDSelect={this.handleSelectBID}/>
                    <Editor
                        toolbar={customToolbar}
                        toolbarCustomButtons={[<Attach />]}
                        editorState={editorState}
                        onEditorStateChange={this.handleEditorStateChange}
                        localization={{
                            locale: 'zh'
                        }}
                        placeholder="与天大分享你刚编的故事"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        bsStyle="primary"
                        onClick={this.handleSubmit}
                        className="raised pull-left"
                        type="submit"
                        disabled={isFetching}
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

const mapStateToProps = state => {
    const newThread = state.get('newThread');
    if (!newThread) return {};

    return {
        isFetching: newThread.get('isFetching'),
        tid: newThread.get('tid'),
        error: newThread.get('error')
    };
};
const mapDispatchToProps = dispatch => ({
    newThread: (bid, title, content) => dispatch(fetchNewThread(bid, title, content))
});

BoardEditor = withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardEditor));
export default BoardEditor;
