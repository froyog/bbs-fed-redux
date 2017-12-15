import React from 'react';
import PropTypes from 'prop-types';
import { InputField } from '../common/Input';
import { Button } from 'react-bootstrap';
import { LoadingDots } from '../common/Loading';


class Appeal extends React.Component {
    static propTypes = {
        onSubmitAppeal: PropTypes.func.isRequired
    }

    constructor () {
        super();
        this.state = {
            realname: '',
            cid: '',
            stunum: '',
            username: '',
            email: '',
            message: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClickAppeal = this.handleClickAppeal.bind(this);
    }

    handleInputChange (e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleClickAppeal (e) {
        e.preventDefault();
        const { onSubmitAppeal } = this.props;
        const { realname, cid, stunum, username, email, message } = this.state;
        onSubmitAppeal && onSubmitAppeal({ realname, cid, stunum, username, email, message });
    }

    render () {
        const { realname, cid, stunum, username, email, message } = this.state;
        const { isFetching, error } = this.props;

        return (
            <form>
                <h4>人工申诉</h4>
                <p>请尽可能填写以下信息，以帮助您更快完成验证</p>
                <InputField 
                    text="姓名"
                    id="realname"
                    className="input-realname"
                    onChange={this.handleInputChange}
                    fullWidth
                    value={realname}
                />
                <InputField 
                    text="学号"
                    id="stunum"
                    className="input-stunum"
                    onChange={this.handleInputChange}
                    fullWidth
                    value={stunum}
                    placeholder="选填"
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
                    placeholder="选填"
                />
                <InputField 
                    text="邮箱"
                    id="email"
                    onChange={this.handleInputChange}
                    fullWidth
                    value={email}
                    placeholder="我们将使用此邮箱与您联系"
                />
                <InputField 
                    text="补充信息"
                    id="message"
                    onChange={this.handleInputChange}
                    fullWidth
                    value={message}
                    placeholder="关于您的更多信息"
                />
                <Button
                    bsStyle="primary"
                    block
                    className="raised submit-button"
                    onClick={this.handleClickAppeal}
                    disabled={isFetching}
                >
                    {
                        isFetching
                            ? <LoadingDots />
                            : '提交'
                    }
                </Button>
            </form>
        );
    }
}

export default Appeal;