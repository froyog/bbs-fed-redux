import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import Time from '../../components/common/Time';
import { InputField } from '../../components/common/Input';
import { showToast } from '../../actions/common/toast';
import { connect } from 'react-redux';
import { toJS } from '../../util';
import { saveProfile } from '../../actions/profile/edit';


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
            isShowPasswordSet: false,
            isPasswordChanged: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClickSetPassword = this.handleClickSetPassword.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmitProfile = this.handleSubmitProfile.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        const { isFetching: nextIsFetching, error, showToast } = nextProps;
        if (!error && !nextIsFetching && nextIsFetching !== this.props.isFetching) {
            if (this.state.isPasswordChanged) {
                showToast('已更新，请重新登录');
                setTimeout(() => {
                    this.props.history.push('/passport/login');
                    return;
                }, 1000);
            }
            showToast('个人资料已更新');
        }
    }

    _checkVaildation (token, value) {
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
        const editedProfile = {
            nickname: nickname,
            signature: signature,
        };
        if (oldPassword) {
            editedProfile.old_password = oldPassword;
            editedProfile.password = password;
            this.setState({
                isPasswordChanged: true
            });
        }
        saveProfile && saveProfile(editedProfile);
    }

    render () {
        const { profile: { name, nickname, signature, points, cPost, cThread, 
            cOnline, tCreate }, isFetching, error } = this.props;
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
                        <Button
                            className="edit-avatar-button"
                        >
                            更新头像
                        </Button>
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
                        disabled={isFetching}
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
                <p className="error-message text-right">{error}</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const editProfileState = state.getIn(['bypassing', 'editProfile']);
    if (!editProfileState) {
        return {};
    }

    return {
        isFetching: editProfileState.get('isFetching'),
        success: editProfileState.get('items'),
        error: editProfileState.get('error')
    };
}
const mapDispatchToProps = dispatch => ({
    saveProfile: editedProfile => dispatch(saveProfile(editedProfile)),
    showToast: message => dispatch(showToast(message))
});
EditingProfile = withRouter(EditingProfile);
EditingProfile = connect(mapStateToProps, mapDispatchToProps)(toJS(EditingProfile));

export default EditingProfile;