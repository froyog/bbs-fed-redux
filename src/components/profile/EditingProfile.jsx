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
    }

    constructor (props) {
        super(props);
        this.state = {
            nickname: props.profile.nickname,
            signature: props.profile.signature,
            isShowPasswordSet: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClickSetPassword = this.handleClickSetPassword.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmitProfile = this.handleSubmitProfile.bind(this);
    }

    handleClickSetPassword () {
        this.setState({
            isShowPasswordSet: !this.state.isShowPasswordSet
        });
    }

    handleInputChange (e) {
        const { target: { id, value } } = e;
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
    }

    render () {
        const { profile: { name, nickname, signature, 
            points, cPost, cThread, cOnline, tCreate } } = this.props;
        const { isShowPasswordSet } = this.state;
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
                            maxHeight: isShowPasswordSet ? '150px' : '0',
                            marginTop: isShowPasswordSet ? '10px' : '0' 
                        }}
                    >
                        <p><InputField 
                            text="原密码"
                            id="passwordOriginal"
                            onChange={this.handleInputChange}
                        /></p>
                        <InputField 
                            text="设置新密码"
                            placeholder="8位以上字符"
                            id="passwordNew"
                            className="input-gap"
                            onChange={this.handleInputChange}
                        />
                        <InputField 
                            text="重复密码"
                            id="passwordNewRepeat"
                            onChange={this.handleInputChange}
                        />
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