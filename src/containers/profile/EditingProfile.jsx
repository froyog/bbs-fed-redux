import React from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import Time from '../../components/common/Time';
import { InputField } from '../../components/common/Input';
import { showToast } from '../../actions/common/toast';
import { connect } from 'react-redux';
import { toJS, dataURItoBlob } from '../../util';
import { saveProfile, uploadAvatar } from '../../actions/profile/edit';
import { getProfileIfNeeded } from '../../actions/profile/profile';
import defaultAvatar from '../../assests/avatar-default.png';

import 'react-image-crop/dist/ReactCrop.css';

const SIZE = 400;

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
        uploadAvatarState: PropTypes.shape({
            isFetching: PropTypes.bool,
            items: PropTypes.string,
            error: PropTypes.error,
        }),
        isFetching: PropTypes.bool,
        success: PropTypes.string,
        error: PropTypes.string,
        saveProfile: PropTypes.func.isRequired,
        showToast: PropTypes.func.isRequired,
        refreshSelfProfile: PropTypes.func.isRequired,
        uploadAvatar: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            nickname: props.profile.nickname,
            signature: props.profile.signature,
            oldPassword: '',
            password: '',
            passwordDuplicate: '',
            notMatchErrorMessage: '',
            isShowPasswordSet: false,
            isPasswordChanged: false,
            uploadedImageUrl: '',
            crop: {
                x: 25,
                y: 25,
                width: 50,
                aspect: 1 / 1,
            },
            pixelCrop: {},
            avatarSrc: `https://bbs.tju.edu.cn/api/user/${props.uid}/avatar`,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClickSetPassword = this.handleClickSetPassword.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmitProfile = this.handleSubmitProfile.bind(this);
        this.handleChooseImage = this.handleChooseImage.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleCompleteCrop = this.handleCompleteCrop.bind(this);
        this.handleSubmitAvatar = this.handleSubmitAvatar.bind(this);
        this.handleFallBackAvatar = this.handleFallBackAvatar.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {
            isFetching: nextIsFetching,
            error,
            showToast,
            history,
            refreshSelfProfile,
            uploadAvatarState,
        } = nextProps;
        if (!error && !nextIsFetching && nextIsFetching !== this.props.isFetching) {
            // success
            refreshSelfProfile();
            if (this.state.isPasswordChanged) {
                showToast('已更新，请重新登录');
                setTimeout(() => {
                    history.push('/passport/login');
                    return;
                }, 1000);
            }
            showToast('个人资料已更新');
        }

        if (
            !uploadAvatarState.error &&
            !uploadAvatarState.isFetching &&
            uploadAvatarState.isFetching !== this.props.uploadAvatarState.isFetching
        ) {
            showToast('头像已更新');
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    }

    _checkVaildation(token, value) {
        if (token === 'passwordRepeat') {
            const { password } = this.state;
            if (password !== value) {
                this.setState({
                    notMatchErrorMessage: '两个密码不匹配，请检查您的输入',
                });
                return;
            }
        }
        this.setState({
            notMatchErrorMessage: '',
        });
    }

    handleChooseImage() {
        this.input.click();
    }

    handleFileUpload(e) {
        e.preventDefault();
        const file = e.target.files[0];
        this.setState({
            uploadedImageUrl: file ? URL.createObjectURL(file) : '',
        });
    }

    handleCompleteCrop(crop, pixelCrop) {
        this.setState({ crop, pixelCrop });
    }

    handleSubmitAvatar(e) {
        e.preventDefault();

        const { uploadedImageUrl, pixelCrop } = this.state;
        const { uploadAvatar } = this.props;
        if (!uploadedImageUrl) return;

        let img = new Image();
        img.onload = () => {
            let canvas = document.createElement('canvas');
            canvas.width = SIZE;
            canvas.height = SIZE;

            let ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, SIZE, SIZE);

            let cropData = pixelCrop;
            if (cropData.width) {
                ctx.drawImage(
                    img,
                    cropData.x,
                    cropData.y,
                    cropData.width,
                    cropData.height,
                    0,
                    0,
                    SIZE,
                    SIZE
                );
            } else if (img.width > img.height) {
                ctx.drawImage(
                    img,
                    (img.width - img.height) / 2,
                    0,
                    img.height,
                    img.height,
                    0,
                    0,
                    SIZE,
                    SIZE
                );
            } else {
                ctx.drawImage(
                    img,
                    0,
                    (img.height - img.width) / 2,
                    img.width,
                    img.width,
                    0,
                    0,
                    SIZE,
                    SIZE
                );
            }

            let form = new FormData();
            form.append('avatar', dataURItoBlob(canvas.toDataURL('image/jpeg')));
            for (var pair of form.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
            uploadAvatar && uploadAvatar(form);
        };
        img.src = uploadedImageUrl;
    }

    handleClickSetPassword() {
        this.setState({
            isShowPasswordSet: !this.state.isShowPasswordSet,
        });
    }

    handleInputChange(e) {
        const {
            target: { id, value },
        } = e;
        this._checkVaildation(id, value);
        this.setState({
            [id]: value,
        });
    }

    handleCancel() {
        const { onCancel } = this.props;
        onCancel && onCancel();
    }

    handleSubmitProfile(e) {
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
                isPasswordChanged: true,
            });
        }
        saveProfile && saveProfile(editedProfile);
    }

    handleFallBackAvatar() {
        this.setState({
            avatarSrc: defaultAvatar,
        });
    }

    render() {
        const {
            profile: { name, nickname, signature, cPost, cOnline, tCreate },
            isFetching,
            error,
        } = this.props;
        const {
            isShowPasswordSet,
            notMatchErrorMessage,
            uploadedImageUrl,
            crop,
            avatarSrc,
        } = this.state;

        return (
            <div className="profile-editing-wrapper">
                <div className="profile-wrapper">
                    <div>
                        {uploadedImageUrl ? (
                            <ReactCrop
                                src={uploadedImageUrl}
                                onChange={this.handleCompleteCrop}
                                crop={crop}
                            />
                        ) : (
                            <img
                                className="profile-avatar editing"
                                src={avatarSrc}
                                alt="user-avatar"
                                onError={this.handleFallBackAvatar}
                            />
                        )}
                        <Button
                            className="edit-avatar-button"
                            onClick={
                                uploadedImageUrl ? this.handleSubmitAvatar : this.handleChooseImage
                            }
                        >
                            {uploadedImageUrl ? '确定' : '更新头像'}
                        </Button>
                        <input
                            type="file"
                            ref={input => (this.input = input)}
                            onChange={this.handleFileUpload}
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
                            marginTop: isShowPasswordSet ? '10px' : '0',
                        }}
                    >
                        <div>
                            <InputField
                                text="原密码"
                                id="oldPassword"
                                type="password"
                                onChange={this.handleInputChange}
                            />
                        </div>
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
                    <p>
                        帐号创建日期：
                        <Time timestamp={tCreate} absolute />
                    </p>
                    <p>
                        上站次数：
                        {cOnline}
                    </p>
                    <p>
                        总共发帖：
                        {cPost}
                    </p>
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
                    <Button className="profile-ops-secondary" onClick={this.handleCancel}>
                        取消
                    </Button>
                </div>
                <p className="error-message text-right">{error}</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const editProfileState = state.getIn(['bypassing', 'editProfile']),
        uploadAvatarState = state.getIn(['bypassing', 'uploadAvatar']);
    if (!editProfileState || !uploadAvatar) {
        return {};
    }

    return {
        isFetching: editProfileState.get('isFetching'),
        success: editProfileState.get('items'),
        error: editProfileState.get('error'),
        uploadAvatarState: uploadAvatarState,
    };
};
const mapDispatchToProps = dispatch => ({
    saveProfile: editedProfile => dispatch(saveProfile(editedProfile)),
    showToast: message => dispatch(showToast(message)),
    refreshSelfProfile: () => dispatch(getProfileIfNeeded('me', true)),
    uploadAvatar: avatar => dispatch(uploadAvatar(avatar)),
});
EditingProfile = withRouter(EditingProfile);
EditingProfile = connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(EditingProfile));

export default EditingProfile;
