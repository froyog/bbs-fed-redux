import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Card } from '../../components/common/Card';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import ThreadRenderer from '../../components/forum/ThreadRenderer';
import draftToMarkdown from 'draftjs-to-markdown';
import Attach from './Attach';
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
        const { editorState } = this.state;
        const { tid, fetchNewComment } = this.props;
        const content = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));

        fetchNewComment(tid, content);
    }

    handleCancelReply () {
        const { onCancelReply } = this.props;
        if (onCancelReply) onCancelReply();
    }

    render () {
        const { editorState } = this.state;
        const { replyContent, error, isFetching } = this.props;

        return (
            <Card className="card-thread-editor">
                <Editor
                    toolbar={customToolbar}
                    toolbarCustomButtons={[<Attach />]}
                    editorState={editorState}
                    onEditorStateChange={this.handleEditorStateChange}
                    localization={{ locale: 'zh' }}
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
    fetchNewComment: (tid, content) => dispatch(fetchNewComment(tid, content))
});
ThreadEditor = connect(mapStateToProps, mapDispatchToProps)(toJS(ThreadEditor));
export default ThreadEditor;
