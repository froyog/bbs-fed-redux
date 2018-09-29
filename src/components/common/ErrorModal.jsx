import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import '../../styles/common/error.less';

const refreshPage = () => {
    location.reload();
};
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
                <p>
                    错误原因：
                    <span className="reason">{reason || '未知原因，已上传至错误服务器'}</span>
                </p>
                {action}
                {needRefresh && (
                    <p>
                        <Button bsStyle="danger" className="raised" onClick={refreshPage}>
                            刷新页面
                        </Button>
                    </p>
                )}
            </div>
        </div>
    );
};

ErrorOverlay.propTypes = {
    reason: PropTypes.string,
    action: PropTypes.element,
    needRefresh: PropTypes.bool,
};
