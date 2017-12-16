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

const refreshPage = () => {
    location.reload();
}
export const ErrorOverlay = ({ reason, action, needRefresh }) => {
    return (
        <div className="error-overlay clearfix">
            <div className="error-msg clearfix">
                <h1 className="face-msg pull-left">:(</h1>
                <div className="text-msg pull-left">
                    <p>喔唷</p>
                    <p className="text-muted">出现错误了...</p>
                </div>
            </div>
            <div className="action">
                <p>错误原因：
                    <span className="reason">
                        {reason || '未知原因，已上传至错误服务器'}
                    </span>
                </p>
                { action }
                { needRefresh &&
                    <p>
                        <Button 
                            bsStyle="danger"
                            className="raised"
                            onClick={refreshPage}
                        >
                            刷新页面
                        </Button>
                    </p>
                }
            </div>
        </div>
    )
}

ErrorOverlay.propTypes = {
    reason: PropTypes.string,
    action: PropTypes.element,
    needRefresh: PropTypes.bool
}