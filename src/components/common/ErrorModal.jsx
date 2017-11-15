import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import '../../styles/common/error.less';

const ErrorModal = ({ className, onDismissErrorModal }) => {
    const customClassName = className ? `error-modal ${className}` : 'error-modal';
    return (
        <div 
            className={customClassName}
        >
            <h4>喔唷，出错了</h4>
            <p>网络连接错误，请检查您的网络连接并刷新重试</p>
            <p>
                <Button 
                    bsStyle="danger" 
                    className="raised"
                >
                    刷新
                </Button>
                <span className="divider">或</span>
                <Button
                    onClick={() => onDismissErrorModal()} 
                    className="raised"
                >
                    关闭
                </Button>
            </p>
        </div>
    );
};

ErrorModal.propTypes = {
    onDismissErrorModal: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default ErrorModal;