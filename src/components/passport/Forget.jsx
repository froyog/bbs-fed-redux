import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { InputField } from '../common/Input';
import { LoadingDots } from '../../components/common/Loading';


class ForgetAuth extends React.Component {
    static propTypes = {
        onSubmitSelfInfo: PropTypes.func.isRequired,
        isFetching: PropTypes.bool,
        error: PropTypes.string
    }

    constructor () {
        super();
        this.state = {
            optionalInfo: '',
            realName: '',
            cid: ''
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitSelfInfo = this.handleSubmitSelfInfo.bind(this);
    }

    handleInputChange (e) {
        const { id, value } = e.target;
        this.setState({
            [id]: value
        });
    }

    handleSubmitSelfInfo (e) {
        e.preventDefault();
        const { onSubmitSelfInfo } = this.props;
        const { realName, cid, optionalInfo } = this.state;
        let selfInfo = { 
            real_name: realName,
            cid: cid
        };
        
        if (/^\d+$/.test(optionalInfo)) {
            // student number
            selfInfo.stunum = optionalInfo;
        } else {
            // username
            selfInfo.username = optionalInfo;
        }
        onSubmitSelfInfo && onSubmitSelfInfo(selfInfo);
    }

    render () {
        const { isFetching, error } = this.props;
        return (
            <div>
                <h3>忘记用户名/密码</h3>
                <p>请填写以下内容进行验证</p>
                <InputField 
                    text="学号或用户名"
                    type="text"
                    id="optionalInfo"
                    fullWidth
                    onChange={this.handleInputChange}
                    placeholder="选填一项"
                />
                <InputField 
                    text="真实姓名"
                    type="text"
                    id="realName"
                    fullWidth
                    onChange={this.handleInputChange}
                />
                <InputField 
                    text="身份证号"
                    type="text"
                    id="cid"
                    fullWidth
                    onChange={this.handleInputChange}
                />
                <Button
                    className="raised submit-button"
                    bsStyle="primary"
                    block
                    type="submit"
                    onClick={this.handleSubmitSelfInfo}
                    disabled={isFetching}
                >
                    提交
                </Button>
                <p className="text-center error-message">{error}</p>
            </div>
        );
    }
}


class ForgetReset extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool,
        error: PropTypes.string,
        username: PropTypes.string.isRequired,
        success: PropTypes.string,
        onSubmitNewPassword: PropTypes.func.isRequired
    }

    constructor () {
        super();
        this.state = {
            password: '',
            passwordRepeat: '',
            errorMessage: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitNewPassword = this.handleSubmitNewPassword.bind(this);
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

    handleSubmitNewPassword (e) {
        e.preventDefault();
        const { onSubmitNewPassword } = this.props;
        const { password } = this.state;

        onSubmitNewPassword && onSubmitNewPassword(password);
    }

    render () {
        const { username, isFetching, error, success } = this.props;
        const { errorMessage } = this.state;
        return (
            <div>
                <h3>验证通过 请重置密码</h3>
                <p>这次别再忘了哈</p>
                {/* username for showing purpose only */}
                <InputField
                    text="用户名"
                    type="text"
                    fullWidth
                    initialValue={username}
                    disabled
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
                    onClick={this.handleSubmitNewPassword}
                    disabled={isFetching}
                >
                    提交
                </Button>
                { success &&
                    <p className="text-center">密码修改成功，正在前往登录页</p>
                }
                <p className="text-center error-message">{error}</p>
            </div>
        );
    }
}

export { ForgetAuth, ForgetReset };