import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from '../actions/passport/login';
import { toJS } from '../util';
import { AUTH_FAIL, AUTH_PASS, toggleAuth } from './action/auth';


class WelcomeLogin extends React.PureComponent {
    static propTypes = {
        login: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        userInfo: PropTypes.shape({
            uid: PropTypes.number,
            token: PropTypes.string,
            group: PropTypes.number
        }),
        error: PropTypes.string
    };

    constructor () {
        super();
        this.state = {
            name: '',
            password: '',
            inviteError: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userInfo) {
            if (nextProps.userInfo.group === 2) {
                // manager
                const { toggleAuth, onAuthPass } = this.props;
                toggleAuth(AUTH_PASS);
                onAuthPass();
                return;
            } else {
                // fetch goes here
                this.setState({
                    inviteError: '无法确定您的身份，您是管理员吗'
                });
            }
        }
    }

    handleInputChange ({ target }) {
        this.setState({
            [target.id]: target.value
        });
    }

    handleSubmit (e) {
        e.preventDefault();
        const { name, password } = this.state;
        this.props.login({
            username: name,
            password: password
        });
    }

    render () {
        const { name, password, isLaoding, inviteError } = this.state;
        const { isFetching, userInfo, error } = this.props;

        return (
            <div className="login-form">
                <p>{error && error}</p>
                <p>{inviteError && inviteError}</p>
                <Form inline>
                    <FormGroup>
                        <ControlLabel>用户名</ControlLabel>
                        {' '}
                        <FormControl
                            id="name"
                            type="text"
                            value={name}
                            placeholder="请使用BBS账户登录"
                            onChange={this.handleInputChange} />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <ControlLabel>密码</ControlLabel>
                        {' '}
                        <FormControl
                            id="password"
                            type="password"
                            value={password}
                            onChange={this.handleInputChange} />
                    </FormGroup>
                    {' '}
                    <Button
                        type="submit"
                        disabled={isFetching}
                        bsStyle="primary"
                        onClick={this.handleSubmit}>
                        {isFetching ? '提交中' : '提交'}
                    </Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const login = state.get('login');
    return {
        isFetching: login.get('isFetching'),
        userInfo: login.get('userInfo'),
        error: login.get('error')
    };
}
const mapDispatchToProps = dispatch => ({
    login: userInfo => dispatch(login(userInfo)),
    toggleAuth: authStatus => dispatch(toggleAuth(authStatus))
});
WelcomeLogin = connect(mapStateToProps, mapDispatchToProps)(toJS(WelcomeLogin));

export default WelcomeLogin;
