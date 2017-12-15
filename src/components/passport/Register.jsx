import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { InputField } from '../common/Input';
import { LoadingDots } from '../../components/common/Loading';


class Register extends React.Component {
    static propTypes = {
        onSubmitRegister: PropTypes.func.isRequired,
        isFetching: PropTypes.bool,
        error: PropTypes.string
    }

    constructor () {
        super();
        this.state = {
            realname: '',
            stunum: '',
            cid: '',
            username: '',
            password: '',
            passwordDuplicate: '',
            errorMessage: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this._checkVaildation = this._checkVaildation.bind(this);
        this.handleClickRegister = this.handleClickRegister.bind(this);
    }

    handleInputChange (e) {
        const { target: { id, value } } = e;
        this._checkVaildation(id, value);
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleClickRegister (e) {
        e.preventDefault();
        const { onSubmitRegister } = this.props;
        const { realname, stunum, cid, username, password } = this.state;
        onSubmitRegister && onSubmitRegister({ realname, stunum, cid, username, password });
    }

    _checkVaildation (token, value) {
        if (token === 'passwordDuplicate') {
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

    render () {
        const { realname, stunum, cid, username, password, passwordDuplicate, errorMessage } = this.state;
        const { error: serverErrorMessage, isFetching } = this.props;

        return (
            <form className="register">
                <h3>欢迎新用户</h3>
                <InputField 
                    text="姓名"
                    id="realname"
                    className="input-realname"
                    onChange={this.handleInputChange}
                    fullWidth
                    value={realname}
                    placeholder="您的真实姓名"
                />
                <InputField 
                    text="学/工号"
                    id="stunum"
                    className="input-stunum"
                    onChange={this.handleInputChange}
                    fullWidth
                    value={stunum}
                    placeholder="新生可用录取通知书号注册"
                />
                <InputField 
                    text="身份证号"
                    id="cid"
                    onChange={this.handleInputChange}
                    fullWidth
                    value={cid}
                />
                <InputField 
                    text="用户名"
                    id="username"
                    onChange={this.handleInputChange}
                    fullWidth
                    value={username}
                    placeholder="仅限字母数字且不能为纯数字"
                />
                <InputField 
                    text="密码"
                    type="password"
                    id="password"
                    onChange={this.handleInputChange}
                    fullWidth
                    value={password}
                    placeholder="8位以上字符"
                />
                <InputField 
                    text="重复密码"
                    type="password"
                    id="passwordDuplicate"
                    onChange={this.handleInputChange}
                    fullWidth
                    value={passwordDuplicate}
                    errorMessage={errorMessage}
                />
                <p className="text-muted">
                    点击注册表示您已阅读并同意
                    <a href="https://bbs.tju.edu.cn/forum/thread/155551/page/1" target="_blank">《求实BBS注册条款》</a>
                </p>
                <Button
                    className="raised submit-button"
                    bsStyle="primary"
                    type="submit"
                    block
                    disabled={errorMessage || isFetching}
                    onClick={this.handleClickRegister}
                >
                    {
                        isFetching
                            ? <LoadingDots />
                            : '注册'
                    }
                </Button>
                <p className="error-msg">{serverErrorMessage}</p>
            </form>
        );
    }
}

export default Register;