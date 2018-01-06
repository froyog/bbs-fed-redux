import React from 'react';
import PropTypes from 'prop-types';
import { InputField } from '../common/Input';
import { Button } from 'react-bootstrap';
import Time from '../common/Time';


class EditingProfile extends React.Component {
    static propTypes = {
        profile: PropTypes.shape({
            name: PropTypes.string.isRequired,
            nickname: PropTypes.string.isRequired,
            signature: PropTypes.string.isRequired,
            points: PropTypes.number.isRequired,
            cPost: PropTypes.number.isRequired,
            cThread: PropTypes.number.isRequired,
            cOnline: PropTypes.number.isRequired,
            tCreate: PropTypes.number.isRequired,
            group: PropTypes.number.isRequired,
        }).isRequired,
        saveProfile: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props);
        this.state = {
            nickname: props.profile.nickname,
            signature: props.profile.signature,
            oldPassword: '',
            password: '',
            passwordDuplicate: '',
            notMatchErrorMessage: '',
            isShowPasswordSet: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClickSetPassword = this.handleClickSetPassword.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmitProfile = this.handleSubmitProfile.bind(this);
    }

    _checkVaildation (token, value) {
        console.log(token);
        
        if (token === 'passwordRepeat') {
            const { password } = this.state;
            if (password !== value) {
                this.setState({
                    notMatchErrorMessage: '两个密码不匹配，请检查您的输入'
                });
                return;
            }
        }
        this.setState({
            notMatchErrorMessage: ''
        });
    }

    handleClickSetPassword () {
        this.setState({
            isShowPasswordSet: !this.state.isShowPasswordSet
        });
    }

    handleInputChange (e) {
        const { target: { id, value } } = e;
        this._checkVaildation(id, value);
        this.setState({
            [id]: value
        });
    }

    handleCancel () {
        const { onCancel } = this.props;
        onCancel && onCancel();
    }

    handleSubmitProfile (e) {
        e.preventDefault();
        const { nickname, signature, password, oldPassword } = this.state;
        const { saveProfile } = this.props;
        saveProfile && saveProfile({
            nickname: nickname,
            signature: signature,
            old_password: oldPassword,
            password: password
        });
    }

    render () {
        const { profile: { name, nickname, signature, 
            points, cPost, cThread, cOnline, tCreate } } = this.props;
        const { isShowPasswordSet, notMatchErrorMessage } = this.state;
        return (
            <div className="profile-editing-wrapper">
                <div className="profile-wrapper">
                    <div>
                        <img 
                            className="profile-avatar editing"
                            src={`https://bbs.tju.edu.cn/api/user/18480/avatar`} 
                            alt="user-avatar" 
                        />
                    </div>
                    <div className="intro editing">
                        <div className="username">{name}</div>
                        <InputField 
                            text="昵称"
                            id="nickname"
                            className="input-gap"
                            onChange={this.handleInputChange}
                            initialValue={nickname}
                        />
                        <InputField 
                            text="签名"
                            id="signature"
                            onChange={this.handleInputChange}
                            initialValue={signature}
                        />
                        <p>
                            <Button
                                bsStyle="warning"
                                className="raised"
                                onClick={this.handleClickSetPassword}
                            >
                                修改密码
                            </Button>
                        </p>
                    </div>
                </div>
                <div className="editing-rest">
                    <div 
                        className="password-set-wrapper"
                        style={{ 
                            maxHeight: isShowPasswordSet ? '180px' : '0',
                            marginTop: isShowPasswordSet ? '10px' : '0' 
                        }}
                    >
                        <div><InputField 
                            text="原密码"
                            id="oldPassword"
                            type="password"
                            onChange={this.handleInputChange}
                            /></div>
                        <div className="edit-password-line clearfix">
                            <InputField 
                                text="设置新密码"
                                type="password"
                                placeholder="8位以上字符"
                                id="password"
                                className="input-gap pull-left"
                                onChange={this.handleInputChange}
                                />
                            <InputField 
                                text="确认密码"
                                type="password"
                                id="passwordRepeat"
                                className="pull-left"
                                onChange={this.handleInputChange}
                                errorMessage={notMatchErrorMessage}
                            />
                        </div>
                    </div>
                    <h4>统计信息</h4>
                    <p>账号创建日期：<Time timestamp={tCreate} absolute /></p>
                    <p>上站次数：{cOnline}</p>
                    <p>总共发帖：{cPost}</p>
                </div>
                <div className="editing-buttons-wrapper clearfix">
                    <Button
                        type="submit"
                        className="profile-ops"
                        onClick={this.handleSubmitProfile}
                    >
                        提交更改
                    </Button>
                    <Button
                        className="profile-ops-secondary"
                        onClick={this.handleCancel}
                    >
                        取消
                    </Button>
                </div>
            </div>
        );
    }
}

export default EditingProfile;