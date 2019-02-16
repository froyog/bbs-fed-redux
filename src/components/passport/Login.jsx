import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import truth from '../../assests/banner.jpg';
import { isMobile } from '../../util';


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
            password: '',
            shouldCollpaseLinks: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
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

    handleInputFocus (e) {
        if (isMobile(1000)) {
            this.setState({
                shouldCollpaseLinks: true
            });
        }
    }

    handleInputBlur (e) {
        if (isMobile(1000)) {
            this.setState({
                shouldCollpaseLinks: false
            });
        }
    }

    render () {
        const { isFetching, error } = this.props;
        const { username, password, shouldCollpaseLinks } = this.state;
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
                            onBlur={this.handleInputBlur}
                            onFocus={this.handleInputFocus}
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <FormControl
                            className="login-input"
                            type="password"
                            value={password}
                            placeholder="请输入密码"
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputBlur}
                            onFocus={this.handleInputFocus}
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
                    <p className="error-msg">{error}</p>
                </Form>
                <div className="additional-link-wrapper" style={{ display: shouldCollpaseLinks ? 'none' : 'block' }}>
                    <Link to='/passport/forget/auth'>忘记用户名/密码</Link>
                    |
                    <Link to='/passport/old'>老用户认证</Link>
                    |
                    <Link to='/passport/appeal'>人工申诉</Link>
                </div>
            </div>
        );
    }
}

export default Login;