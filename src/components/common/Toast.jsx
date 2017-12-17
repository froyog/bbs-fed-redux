import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import '../../styles/common/toast.less';

const Toast = ({ toastMessage, onDismiss }) => {
    return (
        <div className="toast">
            <p className="pull-left">
                Something happens
            </p>
            <Button
                bsStyle="link"
                className="flat pull-right"
                onClick={onDismiss}
            >
                Dismiss
            </Button>
        </div>
    )
};

Toast.propTypes = {
    
};

export default Toast;