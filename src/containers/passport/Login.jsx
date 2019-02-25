import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toJS } from '../../util';
import { login } from '../../actions/passport/log-io';
import Login from '../../components/passport/Login';
import { setReferUrl } from '../../actions/frame/redirect';


class LoginWrapper extends React.Component {
    static propTypes = {
        login: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired
    }

    constructor () {
        super();

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin (username, password) {
        const { login } = this.props;
        login && login(username, password);
    }

    componentWillReceiveProps (nextProps) {
        const { isFetching, success, history, redirectUrl, setReferUrl } = nextProps;
        if (success && isFetching !== this.props.isFetching) {
            history.push(redirectUrl, { from: 'login' });
            setReferUrl('/');
        }
    }

    render () {
        const { isFetching, error } = this.props;
        return (
            <Login 
                onLogin={this.handleLogin}
                isFetching={isFetching}
                error={error}
            />
        );
    }
}

const mapStateToProps = state => {
    const loginState = state.get('login');
    return {
        isFetching: loginState.get('isFetching'),
        success: loginState.get('success'),
        error: loginState.get('error'),
        redirectUrl: state.get('redirectUrl')
    };
};
const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(login(username, password)),
    setReferUrl: url => dispatch(setReferUrl(url))
});
LoginWrapper = connect(mapStateToProps, mapDispatchToProps)(toJS(LoginWrapper));

export default LoginWrapper;
