import React from 'react';
import PropTypes from 'prop-types';
import { InputField } from '../../components/common/Input';
import { Button } from 'react-bootstrap';
import { LoadingDots } from '../common/Loading';


class Login extends React.Component {
    static propTypes = {
        onLogin: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired
    }

    constructor () {
        super();
        this.state = {
            username: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleInputChange (e) {
        const { target: { id, value } } = e;
        this.setState({
            [id]: value
        });
    }

    handleLogin (e) {
        e.preventDefault();
        const { onLogin } = this.props;
        const { username, password } = this.state;
        onLogin && onLogin(username, password);
    }

    render () {
        const { username, password } = this.state;
        const { isFetching, error } = this.props;
        return (
            <form className="login">
                <h2>Welcome to TJUBBS!</h2>
                <InputField
                    text="用户名"
                    id="username"
                    onChange={this.handleInputChange}
                    fullWidth
                    value={username} />
                <InputField
                    text="密码"
                    id="password"
                    type="password"
                    onChange={this.handleInputChange}
                    fullWidth
                    value={password} />
                <Button
                    className="raised"
                    block
                    type="submit"
                    bsStyle="primary"
                    onClick={this.handleLogin}
                    disabled={isFetching}
                >
                    {
                        isFetching 
                            ? <LoadingDots />
                            : '登录'
                    }
                </Button>
                <p>{error}</p>
            </form>
        );
    }
}

export default Login;