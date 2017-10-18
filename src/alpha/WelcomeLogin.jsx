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
        user: PropTypes.shape({
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
            localError: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.user !== "undefined") {
            const adminGroup = nextProps.user.group;
            if (adminGroup === 2) {
                // manager
                const { toggleAuth, onAuthPass } = this.props;
                toggleAuth(AUTH_PASS);
                onAuthPass();
                return;
            } else {
                // not manager, check alpha server invitation list
                // get invitation data from bbs-alpha-with-koa
                // refer to https://git.twtstudio.com/weixinming/bbs-alpha-with-koa
                const { toggleAuth, onAuthPass } = this.props;
                fetch('/signin', {
                    method: 'POST',
                    body: JSON.stringify({
                        uid: nextProps.user.uid
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        if (!json.err) {
                            toggleAuth(AUTH_PASS);
                            onAuthPass();
                            return;
                        }
                        toggleAuth(AUTH_FAIL);
                        this.setState({
                            localError: '您似乎不在邀请列表中，请联系管理员获取邀请资格'
                        });
                        return;
                    }, json => {
                        this.setState({
                            localError: '网络错误'
                        });
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
        const { name, password, localError } = this.state;
        const { isFetching, error } = this.props;

        return (
            <div className="login-form">
                <p>{error && error}</p>
                <p>{localError && localError}</p>
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
    if (!login || ! state) return {};
    return {
        isFetching: login.get('isFetching'),
        user: state.get('user'),
        error: login.get('error')
    };
};
const mapDispatchToProps = dispatch => ({
    login: loginInfo => dispatch(login(loginInfo)),
    toggleAuth: authStatus => dispatch(toggleAuth(authStatus))
});
WelcomeLogin = connect(mapStateToProps, mapDispatchToProps)(toJS(WelcomeLogin));

export default WelcomeLogin;
