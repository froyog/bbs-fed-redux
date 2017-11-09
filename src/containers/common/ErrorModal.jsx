import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ErrorModal from '../../components/common/ErrorModal';
import { toggleErrorModal } from '../../actions/common/error-portal';


let ErrorModalWrapper = ({ className, isShow, setErrorModal }) => {
    const handleDismissErrorModal = () => {
        setErrorModal(false);
    };
    const renderErrorModal = isShow 
        ? <ErrorModal 
            classname={className} 
            onDismissErrorModal={handleDismissErrorModal}/>
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
const mapDispatchToProps = dispatch => ({
    setErrorModal: (isShow) => dispatch(toggleErrorModal(isShow))
});
ErrorModalWrapper = connect(mapStateToProps, mapDispatchToProps)(ErrorModalWrapper);
export default ErrorModalWrapper;