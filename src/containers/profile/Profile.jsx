import React from 'react';
import PropTypes from 'prop-types';
import { Label, Button, Modal } from 'react-bootstrap';
import { getProfileIfNeeded } from '../../actions/profile/profile';
import { sendPrivateMessage } from '../../actions/profile/messages';
import { showToast } from '../../actions/common/toast';
import { FetchingOverlay } from '../../components/common/Loading';
import { connect } from 'react-redux';
import { toJS } from '../../util';
import { InputField } from '../../components/common/Input';
import { Card } from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import EditingProfile from './EditingProfile';
import bgMaterial from '../../assests/bg-material.jpg';
import bgMaterial2 from '../../assests/bg-material2.jpeg';

import '../../styles/profile/profile.less';


class Profile extends React.Component {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        isFetching: PropTypes.bool,
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
        error: PropTypes.string,
        privateState: PropTypes.shape({
            isFetching: PropTypes.bool,
            items: PropTypes.object,
            error: PropTypes.string
        }),
        getProfile: PropTypes.func.isRequired,
        sendPrivateMessage: PropTypes.func.isRequired,
        showToast: PropTypes.func.isRequired,
    }

    constructor () {
        super();
        this.state = {
            privateModalIsOpen: false,
            privateMessage: '',
            isEditingProfile: false
        };

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleTogglePrivateMessage = this.handleTogglePrivateMessage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSendPrivateMessage = this.handleSendPrivateMessage.bind(this);
        this.handleEditProfile = this.handleEditProfile.bind(this);
        this.handleCloseEditProfile = this.handleCloseEditProfile.bind(this);
    }

    
    componentWillMount () {
        const { getProfile, uid } = this.props;
        getProfile && getProfile(uid);
    }

    componentWillReceiveProps (nextProps) {
        const { getProfile, uid: nextUid, privateState, showToast,
            isFetching: nextIsFetching } = nextProps;
        if (nextUid !== this.props.uid) {
            getProfile && getProfile(nextUid);
            return;
        }

        if (!nextIsFetching && nextIsFetching !== this.props.isFetching ) {
            // fetch profile finished
            // setTimeout(() => {
            //     this.wrapper.addEventListener('mousemove', this.handleMouseMove);
            // }, 0)
            new Promise(resolve => {
                resolve();
            }).then(() => {
                this.wrapper.addEventListener('mousemove', this.handleMouseMove);
            });
        }

        if (privateState && !privateState.isFetching &&
            privateState !== this.props.privateState
        ) {
            if (!privateState.error) {
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
        const { isFetching, profile, uidInNumber, uid } = this.props;
        if (!profile || isFetching) {
            return <FetchingOverlay fullPage />;
        }

        const { name, nickname, signature, points } = profile;
        const { privateModalIsOpen, isEditingProfile } = this.state;
        const renderOperators = uid === 'me'
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
                                backgroundImage: `url(${uid === 'me' ? bgMaterial2 : bgMaterial})`
                            }}
                            ref={ bg => this.bg = bg }
                        ></div>
                    </div>
                    {(uid === 'me' && isEditingProfile)
                        ? <EditingProfile 
                            onCancel={this.handleCloseEditProfile} 
                            profile={profile}
                        />
                        : <div className="profile-wrapper">
                            <Avatar 
                                className="profile-avatar"
                                id={uidInNumber} 
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
                                {renderOperators}
                            </div>
                        </div>
                    }
                </div>
            </Card>
        );
        // return (
        //     <Profile 
        //         isSelf={uid === 'me'}
        //         uid={thisUid}
        //         profile={profile} 
        //         onSendPrivateMessage={sendPrivateMessage}
        //         privatePayload={privateState}
        //         showToast={showToast}
        //         saveProfile={saveProfile}
        //     />
        // );
    }
}

const mapStateToProps = (state, ownProps) => {
    let uid = ownProps.uid;
    if (uid === 'me') {
        // get self uid from state
        uid = state.getIn(['user', 'uid']);
    }

    const profileState = state.getIn(['profiles', +uid]);
    if (!profileState) return {};
    
    return {
        uidInNumber: uid,
        isFetching: profileState.get('isFetching'),
        profile: profileState.get('profile'),
        error: profileState.get('error'),
        privateState: state.getIn(['bypassing', 'sendPrivateMessage', +uid])
    };
};
const mapDispatchToProps = dispatch => ({
    getProfile: uid => dispatch(getProfileIfNeeded(uid)),
    sendPrivateMessage: (uid, content) => dispatch(sendPrivateMessage(uid, content)),
    showToast: message => dispatch(showToast(message)),
});
Profile = connect(mapStateToProps, mapDispatchToProps)(toJS(Profile));

export default Profile;