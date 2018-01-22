import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { InputField } from '../common/Input';
import { LoadingDots } from '../../components/common/Loading';


class OldLogin extends React.Component {
    static propTypes = {
        onSubmitLoginInfo: PropTypes.func.isRequired,
        isFetching: PropTypes.bool,
        error: PropTypes.string
    }

    constructor () {
        super();
        this.state = {
            oldUsername: '',
            oldPassword: '',
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitLoginInfo = this.handleSubmitLoginInfo.bind(this);
    }

    handleInputChange (e) {
        const { id, value } = e.target;
        this.setState({
            [id]: value
        });
    }

    handleSubmitLoginInfo (e) {
        e.preventDefault();
        const { onSubmitLoginInfo } = this.props;
        const { oldUsername, oldPassword } = this.state;
        
        onSubmitLoginInfo && onSubmitLoginInfo({
            username: oldUsername,
            password: oldPassword
        });
    }

    render () {
        const { isFetching, error } = this.props;
        return (
            <div>
                <h3>老用户认证</h3>
                <p>如果您的BBS帐号是<strong>2017年5月31日</strong>前注册的， 请完成老用户认证以帮助同步您的个人数据</p>
                <p>此操作只需进行一次</p>
                <InputField 
                    text="原用户名"
                    type="text"
                    id="oldUsername"
                    fullWidth
                    onChange={this.handleInputChange}
                />
                <InputField 
                    text="原密码"
                    type="password"
                    id="oldPassword"
                    fullWidth
                    onChange={this.handleInputChange}
                />
                <Button
                    className="raised submit-button"
                    bsStyle="primary"
                    block
                    type="submit"
                    onClick={this.handleSubmitLoginInfo}
                    disabled={isFetching}
                >
                    提交
                </Button>
                <p className="text-center error-message">{error}</p>
                <p>早已忘记帐号或密码？ 进入<Link to="/appeal">人工申诉</Link>页面取回帐号</p>
            </div>
        );
    }
}


class OldRegister extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool,
        error: PropTypes.string,
        success: PropTypes.string,
        onSubmitRegisterInfo: PropTypes.func.isRequired
    }

    constructor () {
        super();
        this.state = {
            username: '',
            cid: '',
            password: '',
            realName: '',
            passwordRepeat: '',
            errorMessage: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRegisterInfo = this.handleRegisterInfo.bind(this);
    }

    _checkVaildation (token, value) {
        if (token === 'passwordRepeat') {
            const { password } = this.state;
            if (password !== value) {
                this.setState({
                    errorMessage: '两个密码不匹配，请检查您的输入'
                });
                return;
            }
        }
        this.setState({
            errorMessage: ''
        });
    }

    handleInputChange (e) {
        const { id, value } = e.target;
        this._checkVaildation(id, value);
        this.setState({
            [id]: value
        });
    }

    handleRegisterInfo (e) {
        e.preventDefault();
        const { onSubmitRegisterInfo,  } = this.props;
        const { username, cid, password, realName } = this.state;

        onSubmitRegisterInfo && onSubmitRegisterInfo({
            username: username,
            cid: cid,
            real_name: realName,
            password: password
        });
    }

    render () {
        const { isFetching, error, success } = this.props;
        const { errorMessage } = this.state;
        return (
            <div>
                <h3>老用户信息验证成功</h3>
                <p>请选择新用户名和密码</p>
                <InputField
                    text="用户名"
                    id="username"
                    type="text"
                    fullWidth
                    onChange={this.handleInputChange}
                />
                <InputField
                    text="身份证号"
                    id="cid"
                    type="text"
                    fullWidth
                    onChange={this.handleInputChange}
                />
                <InputField
                    text="真实姓名"
                    id="realName"
                    type="text"
                    fullWidth
                    onChange={this.handleInputChange}
                />
                <InputField
                    text="设置新密码"
                    type="password"
                    id="password"
                    fullWidth
                    onChange={this.handleInputChange}
                />
                <InputField
                    text="重复密码"
                    type="password"
                    id="passwordRepeat"
                    fullWidth
                    errorMessage={errorMessage}
                    onChange={this.handleInputChange}
                />
                <Button
                    className="raised submit-button"
                    bsStyle="primary"
                    block
                    type="submit"
                    onClick={this.handleRegisterInfo}
                    disabled={isFetching}
                >
                    提交
                </Button>
                { success &&
                    <p className="text-center">注册成功</p>
                }
                <p className="text-center error-message">{error}</p>
            </div>
        );
    }
}

export { OldLogin, OldRegister };