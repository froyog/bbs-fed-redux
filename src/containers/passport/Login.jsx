import React from 'react';
// import PropTypes from 'prop-types';
import { InputField } from '../../components/common/Input';
import { Button } from 'react-bootstrap';


class Login extends React.Component {
    constructor () {
        super();
        this.state = {
            username: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange ({ target }) {
        this.setState({
            [target.id]: target.value
        });
    }

    render () {
        console.log('relogin');
        const { username, password } = this.state;
        return (
            <div className="login">
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
                >
                    登录
                </Button>
            </div>
        );
    }
}

Login.propTypes = {

};
export default Login;
