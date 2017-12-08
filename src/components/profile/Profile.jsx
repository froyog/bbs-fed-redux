import React from 'react';
import PropTypes from 'prop-types';
import { Media, Label, Button } from 'react-bootstrap';
import { Card } from '../../components/common/Card';
import Avatar from '../common/Avatar';

import '../../styles/profile/profile.less';


class Profile extends React.Component {
    constructor () {
        super();
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }
    
    componentDidMount () {
        this.wrapper.addEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove (e) {
        let hratio = e.screenX / window.innerHeight,
            wratio = e.screenY / window.innerWidth;
        this.bg.style.transform = `translate(${(hratio-0.5)*20}px, ${(wratio-0.5)*20}px)`;
    }

    render () {
        const { profile: { name, nickname, signature, 
            points, cPost, cThread, cOnline, tCreate}, uid, isSelf } = this.props;
        return (
            <Card className="card-profile">
                <div ref={ wrapper => this.wrapper = wrapper }>
                    <div className="profile-cover">
                        <div 
                            className="bg"
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
                            {
                                isSelf
                                    ? <Button
                                        className="profile-ops"
                                      >
                                        编辑个人资料
                                      </Button>
                                    : <Button
                                        className="profile-ops"
                                      >
                                        发私信
                                      </Button>
                            }
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default Profile;