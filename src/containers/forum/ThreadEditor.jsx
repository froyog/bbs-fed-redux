import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Card } from '../../components/common/Card';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import ThreadRenderer from '../../components/forum/ThreadRenderer';
import AnonymousSwitch from '../../components/forum/AnonymousSwitch';
import AdvancedSwitch from '../../components/forum/AdvancedSwitch';
import Attach from './editor/Attach';
import { getDecorator } from './editor/mention.js';
import { toJS, draftToMarkdown, customToolbar } from '../../util';
import { fetchNewComment } from '../../actions/forum/thread';

import '../../styles/forum/editor.less';


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
            anonymous: false,
            advancedMode: false,
        };

        this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancelReply = this.handleCancelReply.bind(this);
        this.getEditorState = this.getEditorState.bind(this);
        this.handleToggleAdvanced = this.handleToggleAdvanced.bind(this);
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
        const { editorState, anonymous, advancedMode } = this.state;
        const { tid, fetchNewComment, replyContent, replyId } = this.props;
        let content;
        if (advancedMode) {
            content = editorState.getCurrentContent().getPlainText();
        } else {
            content = draftToMarkdown(convertToRaw(editorState.getCurrentContent()), {
                entityItems: {
                    'IMAGE': {
                        open: () => {},
                        close: entity => `![](${entity.data.src})`
                    }
                }
            });
        }
        if (replyContent.trim()) {
            content = `${content}\n\n${replyContent}`;
        }

        fetchNewComment(tid, content, anonymous, replyId);
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

    handleToggleAdvanced (advancedState) {
        this.setState({
            advancedMode: advancedState
        });
    }

    getEditorState () {
        return this.state.editorState;
    }

    render () {
        const { editorState, advancedMode } = this.state;
        const { replyContent, error, isFetching, allowAnonymous } = this.props;

        return (
            <Card className="card-thread-editor">
                <Editor
                    toolbarStyle={ advancedMode ? { display: 'none' } : {}}
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
                <div className="clearfix">
                    <Button
                        type="submit"
                        className="raised"
                        bsStyle="primary"
                        onClick={this.handleSubmit}
                        disabled={isFetching}
                    >
                        发表回复
                    </Button>
                    <div className="clearfix pull-right">
                        {
                            allowAnonymous
                                ? <AnonymousSwitch onToggle={this.handleToggleAnonymous} /> 
                                : null
                        }
                        <AdvancedSwitch 
                            className="advanced-switch"
                            onToggle={this.handleToggleAdvanced}
                        />
                    </div>
                </div>
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
    fetchNewComment: (tid, content, anonymous, replyId) => dispatch(fetchNewComment(tid, content, anonymous, replyId))
});
ThreadEditor = connect(mapStateToProps, mapDispatchToProps)(toJS(ThreadEditor));
export default ThreadEditor;
