import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Collapse, Button } from 'react-bootstrap';

import '../../styles/common/error.less';


class ErrorControl extends React.Component {
    constructor () {
        super();
        this.state = {
            isAlertVisible: true
        };

        this.handleDismissAlert = this.handleDismissAlert.bind(this);
    }

    handleDismissAlert () {
        this.setState({ isAlertVisible: false })
    }

    render () {
        const { isAlertVisible } = this.state;

        return (
            <Collapse in={isAlertVisible} className="error-control-alert">
                <Alert bsStyle="danger" onDismiss={this.handleDismissAlert}>
                    <h4>喔唷，出错了</h4>
                    <p>原因：</p>
                    <p>
                        <Button bsStyle="danger">刷新重试</Button>
                        <span> 或 </span>
                        <Button onClick={this.handleDismissAlert}>关闭此消息</Button>
                    </p>
                </Alert>
            </Collapse>
        )
    }
}

export default ErrorControl;
