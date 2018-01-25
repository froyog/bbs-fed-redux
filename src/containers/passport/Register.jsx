import React from 'react';
import PropTypes from 'prop-types';
import Register from '../../components/passport/Register';
import { newRegister } from '../../actions/passport/register';
import { connect } from 'react-redux';
import { toJS } from '../../util';


let RegisterWrapper = ({ isFetching, error, item, onNewRegister }) => {
    const handleRegister = (registerInfo) => {
        onNewRegister && onNewRegister(registerInfo);
    };

    return (
        <Register 
            isFetching={isFetching}
            error={error}
            success={item}
            onSubmitRegister={handleRegister}
        />
    );
};

RegisterWrapper.propTypes = {
    onNewRegister: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    error: PropTypes.string
};

const mapStateToProps = state => {
    const newRegisterState = state.getIn(['bypassing', 'newRegister']);
    if (!newRegisterState) return;

    return {
        isFetching: newRegisterState.get('isFetching'),
        error: newRegisterState.get('error'),
        item: newRegisterState.get('items')
    };
};
const mapDispatchToProps = dispatch => ({
    onNewRegister: registerInfo => dispatch(newRegister(registerInfo))
});
RegisterWrapper = connect(mapStateToProps, mapDispatchToProps)(toJS(RegisterWrapper));
export default RegisterWrapper;
