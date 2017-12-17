import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import '../../styles/common/toast.less';

class Toast extends React.Component {
    static propTypes = {
        toastMessage: PropTypes.string.isRequired,
        onDismiss: PropTypes.func.isRequired
    }

    componentDidMount () {
        this.timer = setTimeout(() => {
            this.props.onDismiss();
        }, 3000);
    }

    componentWillUnmount () {
        clearTimeout(this.timer);
    }

    render () {
        const { toastMessage, onDismiss } = this.props;
        return (
            <div className="toast">
                <p className="pull-left">
                    {toastMessage}
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
    }
}

export default Toast;