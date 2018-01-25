import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toast from '../../components/common/Toast';
import { hideToast } from '../../actions/common/toast';


let ToastWrapper = ({ className, isShow, toastMessage, hideToast }) => {
    const renderErrorModal = isShow 
        ? <Toast 
            classname={className} 
            toastMessage={toastMessage}
            onDismiss={hideToast} 
        />
        : null;
    return renderErrorModal;
};

ToastWrapper.propTypes = {
    className: PropTypes.string,
    isShow: PropTypes.bool,
    toastMessage: PropTypes.string,
    hideToast: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isShow: state.getIn(['toast', 'isShow']),
    toastMessage: state.getIn(['toast', 'message'])
});
const mapDispatchToProps = {
    hideToast
};
ToastWrapper = connect(mapStateToProps, mapDispatchToProps)(ToastWrapper);
export default ToastWrapper;