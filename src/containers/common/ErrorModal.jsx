import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ErrorModal from '../../components/common/ErrorModal';
import { hideErrorModal } from '../../actions/common/error-portal';


let ErrorModalWrapper = ({ className, isShow, hideErrorModal }) => {
    const handleDismissErrorModal = () => {
        hideErrorModal();
    };
    const renderErrorModal = isShow 
        ? <ErrorModal 
            classname={className} 
            onDismissErrorModal={handleDismissErrorModal} 
        />
        : null;
    return renderErrorModal;
};

ErrorModal.propTypes = {
    className: PropTypes.string,
    isShow: PropTypes.bool,
    setErrorModal: PropTypes.func
};

const mapStateToProps = state => ({
    isShow: state.get('errorModalIsShow')
});
const mapDispatchToProps = {
    hideErrorModal
};
ErrorModalWrapper = connect(mapStateToProps, mapDispatchToProps)(ErrorModalWrapper);
export default ErrorModalWrapper;