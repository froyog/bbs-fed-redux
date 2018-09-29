import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import truth from '../../assests/banner.jpg';

class Login extends React.Component {
    static propTypes = {
        onLogin: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
    };

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleInputChange(e) {
        const {
            target: { id, value },
        } = e;
        this.setState({
            [id]: value,
        });
    }

    handleLogin(e) {
        e.preventDefault();
        const { onLogin } = this.props;
        const { username, password } = this.state;
        onLogin && onLogin(username, password);
    }

    render() {
        const { isFetching, error } = this.props;
        const { username, password } = this.state;
        return (
            <div className="login">
                <img className="banner" src={truth} alt="banner" />
                <Form className="login-form">
                    <FormGroup controlId="username">
                        <FormControl
                            className="login-input"
                            type="text"
                            value={username}
                            placeholder="请输入用户名"
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <FormControl
                            className="login-input"
                            type="password"
                            value={password}
                            placeholder="请输入密码"
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <Button
                        className="login-button"
                        type="submit"
                        block
                        bsStyle="primary"
                        onClick={this.handleLogin}
                        disabled={isFetching}
                    >
                        登 录
                    </Button>
                    <a href="https://login.twtstudio.com/sso/login">天外天账号登录</a>
                    <p className="error-msg">{error}</p>
                </Form>
                <div className="additional-link-wrapper">
                    <Link to="/passport/forget/auth">忘记用户名/密码</Link>|
                    <Link to="/passport/old">老用户认证</Link>|
                    <Link to="/passport/appeal">人工申诉</Link>
                </div>
            </div>
        );
    }
}

export default Login;
