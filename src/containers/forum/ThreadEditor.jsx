import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Card } from '../../components/common/Card';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import ThreadRenderer from '../../components/forum/ThreadRenderer';
import AnonymousSwitch from '../../components/forum/AnonymousSwitch';
import { draftToMarkdown } from 'markdown-draft-js';
import Attach from './editor/Attach';
import { getDecorator } from './editor/mention.js';
import { toJS } from '../../util';
import { fetchNewComment } from '../../actions/forum/thread';

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
        onCancelReply: PropTypes.func.isRequired,
        isFetching: PropTypes.bool,
        error: PropTypes.string,
        pid: PropTypes.number,
        allowAnonymous: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired
    };

    constructor () {
        super();
        this.state = {
            editorState: EditorState.createEmpty(),
            anonymous: false
        };

        this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancelReply = this.handleCancelReply.bind(this);
        this.getEditorState = this.getEditorState.bind(this);
        this.handleToggleAnonymous = this.handleToggleAnonymous.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        const { pid, onCommentSuccess } = nextProps;
        const { pid: oldPid } = this.props;
        if (pid && pid !== oldPid) {
            onCommentSuccess();
        }
    }

    handleEditorStateChange (editorState) {
        this.setState({
            editorState
        });
    }

    handleSubmit (e) {
        e.preventDefault();
        const { editorState, anonymous } = this.state;
        const { tid, fetchNewComment, replyContent } = this.props;
        let content = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
        if (replyContent.trim()) {
            content = `${content}\n\n${replyContent}`;
        }
        fetchNewComment(tid, content, anonymous);
    }

    handleCancelReply () {
        const { onCancelReply } = this.props;
        if (onCancelReply) onCancelReply();
    }

    handleToggleAnonymous (anonymousState) {
        this.setState({
            anonymous: anonymousState
        });
    }

    getEditorState () {
        return this.state.editorState;
    }

    render () {
        const { editorState } = this.state;
        const { replyContent, error, isFetching, allowAnonymous } = this.props;

        return (
            <Card className="card-thread-editor">
                <Editor
                    toolbar={customToolbar}
                    toolbarCustomButtons={[<Attach />]}
                    editorState={editorState}
                    onEditorStateChange={this.handleEditorStateChange}
                    localization={{ locale: 'zh' }}
                    customDecorators={getDecorator(
                        this.getEditorState, 
                        this.handleEditorStateChange)}
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
                    disabled={isFetching}
                >
                    发表回复
                </Button>
                {
                    allowAnonymous
                        ? <AnonymousSwitch
                            className="pull-right"
                            onToggle={this.handleToggleAnonymous} 
                        /> 
                        : null
                }
                <span className="error-message">{error}</span>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const newComment = state.get('newComment');
    if (!newComment) return {};

    return {
        isFetching: newComment.get('isFetching'),
        pid: newComment.get('pid'),
        error: newComment.get('error')
    };
};
const mapDispatchToProps = dispatch => ({
    fetchNewComment: (tid, content, anonymous) => dispatch(fetchNewComment(tid, content, anonymous))
});
ThreadEditor = connect(mapStateToProps, mapDispatchToProps)(toJS(ThreadEditor));
export default ThreadEditor;
