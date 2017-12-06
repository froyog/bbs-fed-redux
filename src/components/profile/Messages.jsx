import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, FormControl, Modal } from 'react-bootstrap';


export class MessagePrivate extends React.Component {
    constructor () {
        super();
        this.state = {
            isShowReplyBox: false,
            replyValue: '',
            isShowDialog: false,
            page: 0
        };

        this.handleClickReply = this.handleClickReply.bind(this);
        this.handleClickSend = this.handleClickSend.bind(this);
        this.handleReplyChange = this.handleReplyChange.bind(this);
        this.handleShowDialog = this.handleShowDialog.bind(this);
        this.handleHideDialog = this.handleHideDialog.bind(this);
    }

    handleClickReply () {
        this.setState({
            isShowReplyBox: !this.state.isShowReplyBox
        });
    }

    handleReplyChange (e) {
        this.setState({
            replyValue: e.target.value
        });
    }

    handleClickSend (e) {
        e.preventDefault();
        const { onSendPrivateMessage, authorId } = this.props;
        const { replyValue } = this.state;
        onSendPrivateMessage(authorId, replyValue);
    }

    handleShowDialog () {
        const { authorId, onGetDialog } = this.props;
        const { page } = this.state;
        onGetDialog(page, authorId);
        this.setState({
            isShowDialog: true
        });
    }

    handleHideDialog () {
        this.setState({
            isShowDialog: false
        });
    }

    render () {
        const { restInfo: { id, content }, authorName } = this.props;
        const { isShowReplyBox, replyValue, isShowDialog } = this.state;

        return (
            <div>
                <div>
                    <p>{content}</p>
                    <Button 
                        bsStyle="link" 
                        className="flat"
                        onClick={this.handleClickReply}
                    >
                        回复
                    </Button>
                    <Button 
                        bsStyle="link" 
                        className="flat"
                        onClick={this.handleShowDialog}
                    >
                        查看对话
                    </Button>
                </div>
                {
                    isShowReplyBox &&
                    <Form inline className="reply-box">
                        <FormGroup>
                            <FormControl 
                                type="text" 
                                onChange={this.handleReplyChange}
                                value={replyValue}
                                placeholder="想对Ta说的话" 
                            />
                        </FormGroup>
                        {' '}
                        <Button 
                            bsStyle="default" 
                            type="submit"
                            onClick={this.handleClickSend}
                        >
                            发送
                        </Button>
                    </Form>
                }
                <Modal show={isShowDialog} onHide={this.handleHideDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>与{authorName}的对话列表</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleHideDialog}>关闭</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}