import React from 'react';
import PropTypes from 'prop-types';
import { Label, Button, Modal } from 'react-bootstrap';
import { InputField } from '../../components/common/Input';
import { Card } from '../../components/common/Card';
import Avatar from '../common/Avatar';
import EditingProfile from './EditingProfile';
import bgMaterial from '../../assests/bg-material.jpg';
import bgMaterial2 from '../../assests/bg-material2.jpeg';

import '../../styles/profile/profile.less';


class Profile extends React.Component {
    static propTypes = {
        profile: PropTypes.shape({
            name: PropTypes.string,
            nickname: PropTypes.string,
            signature: PropTypes.string,
            points: PropTypes.number,
            cPost: PropTypes.number,
            cThread: PropTypes.number,
            cOnline: PropTypes.number,
            tCreate: PropTypes.number,
            group: PropTypes.number,
            recent: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number,
                title: PropTypes.string,
                bElite: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
                visibility: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
                tCreate: PropTypes.number,
                tReply: PropTypes.number
            }))
        }),
        uid: PropTypes.number,
        isSelf: PropTypes.bool,
        onSendPrivateMessage: PropTypes.func.isRequired,
        showToast: PropTypes.func.isRequired,
        saveProfile: PropTypes.func.isRequired
    }

    constructor () {
        super();
        this.state = {
            privateModalIsOpen: false,
            privateMessage: '',
            isEditingProfile: true
        };

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleTogglePrivateMessage = this.handleTogglePrivateMessage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSendPrivateMessage = this.handleSendPrivateMessage.bind(this);
        this.handleEditProfile = this.handleEditProfile.bind(this);
        this.handleCloseEditProfile = this.handleCloseEditProfile.bind(this);
    }
    
    componentDidMount () {
        this.wrapper.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillReceiveProps (nextProps) {
        const { privatePayload, showToast } = nextProps;
        if (privatePayload && !privatePayload.isFetching &&
            privatePayload !== this.props.privatePayload
        ) {
            if (!privatePayload.error) {
                this.setState({
                    privateModalIsOpen: false
                });
                showToast('私信已发送');
            }
        }
    }

    handleMouseMove (e) {
        let hratio = e.screenX / window.innerHeight,
            wratio = e.screenY / window.innerWidth;
        this.bg.style.transform = `translate(${(hratio-0.5)*20}px, ${(wratio-0.5)*20}px)`;
    }

    handleTogglePrivateMessage () {
        this.setState({
            privateModalIsOpen: !this.state.privateModalIsOpen
        });
    }

    handleInputChange (e) {
        const { target: { id, value } } = e;
        this.setState({
            [id]: value
        });
    }

    handleSendPrivateMessage (e) {
        e.preventDefault();
        const { onSendPrivateMessage, uid } = this.props;
        const { privateMessage: content } = this.state;
        onSendPrivateMessage && onSendPrivateMessage(+uid, content);
    }

    handleEditProfile () {
        this.setState({
            isEditingProfile: true
        });
    }

    handleCloseEditProfile () {
        this.setState({
            isEditingProfile: false
        });
    }

    render () {
        const { profile, profile: { name, nickname, signature, 
            points, cPost, cThread, cOnline, tCreate }, uid, isSelf, saveProfile } = this.props;
        const { privateModalIsOpen, isEditingProfile } = this.state;
        const renderOperators = isSelf
            ? <div className="profile-ops-wrapper">
                <Button
                    className="profile-ops"
                    onClick={this.handleEditProfile}
                >
                    编辑个人资料
                </Button>
            </div>
            : <div className="profile-ops-wrapper private-message">
                <Button
                    className="profile-ops"
                    onClick={this.handleTogglePrivateMessage}
                >
                    发私信
                </Button>
                {
                    privateModalIsOpen &&
                    <form className="private-message-wrapper">
                        <InputField
                            text="私信内容"
                            id="privateMessage"
                            onChange={this.handleInputChange}
                        />
                        <Button
                            type="submit"
                            bsStyle="primary"
                            className="raised pull-right"
                            onClick={this.handleSendPrivateMessage}
                        >
                            发送
                        </Button>
                        <Button
                            className="raised pull-right"
                            onClick={this.handleTogglePrivateMessage}
                        >
                            关闭
                        </Button>
                    </form>
                }
            </div>;
        
        return (
            <Card className="card-profile">
                <div ref={ wrapper => this.wrapper = wrapper }>
                    <div className="profile-cover">
                        <div 
                            className="bg"
                            style={{
                                backgroundImage: `url(${isSelf ? bgMaterial2 : bgMaterial})`
                            }}
                            ref={ bg => this.bg = bg }
                        ></div>
                    </div>
                    {(isSelf && isEditingProfile)
                        ? <EditingProfile
                            profile={profile}
                            onCancel={this.handleCloseEditProfile}
                            saveProfile={saveProfile}
                        />
                        : <div className="profile-wrapper">
                            <Avatar 
                                className="profile-avatar"
                                id={+uid} 
                                imageShape="rounded"
                            />
                            <div className="intro">
                                <div className="username">
                                    {name}
                                    <span className="nickname">（{nickname}）</span>
                                </div>
                                <p className="text-muted">{signature || '这个人很懒什么都没有留下'}</p>
                                <Label bsStyle="primary">
                                    {points} <span className="points-content">积分</span>
                                </Label>
                                <div className="profile-ops-wrapper">
                                    {renderOperators}
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Card>
        );
    }
}

export default Profile;