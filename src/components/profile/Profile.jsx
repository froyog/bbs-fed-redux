import React from 'react';
import PropTypes from 'prop-types';
import { Label, Button, Modal } from 'react-bootstrap';
import { Card } from '../../components/common/Card';
import Avatar from '../common/Avatar';
import bgMaterial from '../../assests/bg-material.jpg';
import bgMaterial2 from '../../assests/bg-material2.jpeg';

import '../../styles/profile/profile.less';


class Profile extends React.Component {
    constructor () {
        super();
        this.state = {
            privateModalIsOpen: false
        };

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleTogglePrivateMessage = this.handleTogglePrivateMessage.bind(this);
    }
    
    componentDidMount () {
        this.wrapper.addEventListener('mousemove', this.handleMouseMove);
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

    render () {
        const { profile: { name, nickname, signature, 
            points, cPost, cThread, cOnline, tCreate}, uid, isSelf } = this.props;
        const { privateModalIsOpen } = this.state;
        const bgPath = isSelf ? bgMaterial2 : bgMaterial;

        return (
            <Card className="card-profile">
                <div ref={ wrapper => this.wrapper = wrapper }>
                    <div className="profile-cover">
                        <div 
                            className="bg"
                            style={{
                                backgroundImage: `url(${bgPath})`
                            }}
                            ref={ bg => this.bg = bg }
                        ></div>
                    </div>
                    <div className="profile-wrapper">
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
                                { isSelf
                                    ? <Button
                                        className="profile-ops"
                                    >
                                        编辑个人资料
                                    </Button>
                                    : <Button
                                        className="profile-ops"
                                        onClick={this.handleTogglePrivateMessage}
                                    >
                                        发私信
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default Profile;