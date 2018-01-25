import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { InputField } from '../../components/common/Input';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import { fetchNewThread } from '../../actions/forum/board';
import AnonymousSwitch from '../../components/forum/AnonymousSwitch';
import { connect } from 'react-redux';
import { getDecorator } from './editor/mention.js';
import Attach from './editor/Attach';
import BIDSelector from './BIDSelector';
import { toJS } from '../../util';

import '../../styles/forum/editor.less';


const customToolbar = {
    options: ['inline', 'blockType', 'list', 'emoji', 'history'],
    inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace']
    },
    list: {
        options: ['unordered', 'ordered']
    },
    image: { alignmentEnabled: false }
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
            bid: 0,
            referToThread: false,
            anonymous: false
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSelectBID = this.handleSelectBID.bind(this);
        this.getEditorState = this.getEditorState.bind(this);
        this.handleToggleAnonymous = this.handleToggleAnonymous.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        const { tid, error, isFetching } = nextProps;
        if (tid && !error && !isFetching) {
            // success
            this.handleCloseModal();
            this.setState({
                referToThread: tid
            });
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

    handleToggleAnonymous (anonymousState) {
        this.setState({
            anonymous: anonymousState
        });
    }

    handleSubmit (e) {
        e.preventDefault();
        const { newThread } = this.props;
        const { editorState, title, anonymous } = this.state;
        const mdContent = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));

        const { bid } = this.state;
        if (!bid) return;
        
        newThread(bid, title, mdContent, anonymous);
    }

    getEditorState () {
        return this.state.editorState;
    }
    
    render () {
        const { editorState, title, referToThread, bid } = this.state;
        const { isFetching, error } = this.props;
        if (referToThread) {
            return <Redirect to={`/forum/thread/${referToThread}/page/1`} />;
        }

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
                    <BIDSelector 
                        onBIDSelect={this.handleSelectBID}
                    />
                    <Editor
                        toolbar={customToolbar}
                        toolbarCustomButtons={[<Attach />]}
                        editorState={editorState}
                        onEditorStateChange={this.handleEditorStateChange}
                        localization={{
                            locale: 'zh'
                        }}
                        placeholder="与天大分享你刚编的故事"
                        customDecorators={getDecorator(
                            this.getEditorState, 
                            this.handleEditorStateChange)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <p className="error-message-in-editor">{error}</p>
                    {
                        +bid === 193 &&
                        <AnonymousSwitch 
                            className="pull-left"
                            onToggle={this.handleToggleAnonymous}
                        />
                    }
                    <Button
                        bsStyle="link"
                        onClick={this.handleSubmit}
                        className="flat"
                        type="submit"
                        disabled={isFetching}
                    >
                        发表
                    </Button>
                    <Button
                        bsStyle="link"
                        onClick={this.handleCloseModal}
                        className="flat"
                    >
                        关闭
                    </Button>
                </Modal.Footer>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const newThread = state.get('newThread');
    if (!newThread) return {};

    return {
        isFetching: newThread.get('isFetching'),
        tid: newThread.get('tid'),
        error: newThread.get('error'),
    };
};
const mapDispatchToProps = dispatch => ({
    newThread: (bid, title, content, anonymous) => dispatch(fetchNewThread(bid, title, content, anonymous)),
});
BoardEditor = connect(mapStateToProps, mapDispatchToProps)(toJS(BoardEditor));

export default BoardEditor;
