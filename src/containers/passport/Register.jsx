import React from 'react';
import PropTypes from 'prop-types';
import Register from '../../components/passport/Register';
import { newRegister } from '../../actions/passport/register';
import { connect } from 'react-redux';
import { toJS } from '../../util';


class RegisterWrapper extends React.Component {
    static propTypes = {
        onNewRegister: PropTypes.func.isRequired,
        isFetching: PropTypes.bool,
        error: PropTypes.string
    }

    constructor () {
        super();

        this.handleRegister = this.handleRegister.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        const { isFetching, success, history } = nextProps;
        if (success === '请求成功' && !isFetching && isFetching !== this.props.isFetching) {
            this.timeout = setTimeout(() => {
                history.push('/passport/login');
            }, 2000);
        }
    }

    handleRegister (registerInfo) {
        const { onNewRegister } = this.props;
        onNewRegister && onNewRegister(registerInfo);
    }

    render () {
        const { isFetching, error, item } = this.props;

        return (
            <Register 
                isFetching={isFetching}
                error={error}
                success={item}
                onSubmitRegister={this.handleRegister}
            />
        )
    }
}

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
