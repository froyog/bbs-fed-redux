import React from 'react';
import PropTypes from 'prop-types';
import { Media, Label } from 'react-bootstrap';
import { Card } from '../../components/common/Card';
import Avatar from '../common/Avatar';

import '../../styles/profile/profile.less';


const Profile = ({ profile: { name, nickname, signature, 
    points, cPost, cThread, cOnline, tCreate}, uid }) => {
    
    return (
        <Card className="card-profile">
            <div className="profile-cover"></div>
            <Media>
                <Media.Left>
                    <Avatar 
                        className="profile-avatar"
                        id={+uid} 
                        imageShape="rounded" 
                    />
                </Media.Left>
                <Media.Body>
                    <Media.Heading>
                        {name}
                        <span className="nickname">（{nickname}）</span>
                    </Media.Heading>
                    <p>{signature}</p>
                    <p>
                        <Label bsStyle="primary">
                            {points} <span className="points-content">积分</span>
                        </Label>
                        
                    </p>
                </Media.Body>
            </Media>
        </Card>
    );
};

Profile.propTypes = {
    profile: PropTypes.shape({
        name: PropTypes.string,
        nickname: PropTypes.string,
        signature: PropTypes.string,
        points: PropTypes.number,
        cPost: PropTypes.number,
        cThread: PropTypes.number,
        cOnline: PropTypes.number,
        tCreate: PropTypes.number,
        group: PropTypes.number
    }),
    uid: PropTypes.string.isRequired
};

export default Profile;