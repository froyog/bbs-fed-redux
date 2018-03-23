import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Prompt } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import { Card } from '../../components/common/Card';
import { InputField } from '../../components/common/Input';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import { fetchNewThread } from '../../actions/forum/board';
import AnonymousSwitch from '../../components/forum/AnonymousSwitch';
import { connect } from 'react-redux';
import { getDecorator } from './editor/mention.js';
import Attach from './editor/Attach';
import BIDSelector from './BIDSelector';
import { toJS, draftToMarkdown } from '../../util';

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
        newThread: PropTypes.func.isRequired,
        bid: PropTypes.number
    };

    constructor () {
        super();
        this.state = {
            editorState: EditorState.createEmpty(),
            bid: 0,
            referToThread: false,
            anonymous: false,
            hasContent: false,
        };

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
            this.setState({
                referToThread: tid
            });
        }
    }

    handleEditorStateChange (editorState) {
        this.setState({
            editorState,
            hasContent: editorState.getCurrentContent().hasText()
        });
    }

    handleTitleChange ({ target }) {
        this.setState({
            title: target.value,
            hasContent: target.value.length
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

        this.setState({
            hasContent: false
        });
        
        newThread(bid, title, mdContent, anonymous);
    }

    getEditorState () {
        return this.state.editorState;
    }
    
    render () {
        const { editorState, title, referToThread, bid, hasContent } = this.state;
        const { isFetching, error } = this.props;
        if (referToThread) {
            return <Redirect to={`/forum/thread/${referToThread}/page/1`} />;
        }

        return (
            <Card className="editor-main">
                <Prompt 
                    when={!!hasContent}
                    message="确定要离开吗？编辑器的内容不会被保存"
                />
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
                <footer>
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
                    <LinkContainer to="/">
                        <Button
                            bsStyle="link"
                            className="flat"
                        >
                            返回主页
                        </Button>
                    </LinkContainer>
                </footer>
            </Card>
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
