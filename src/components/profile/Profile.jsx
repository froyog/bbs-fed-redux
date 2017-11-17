import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../../components/common/Card';


const Profile = ({ profile: { name, nickname, signature, 
    points, cPost, cThread, cOnline, tCreate}, uid }) => {
    
    return (
        <Card>
            {name}
            {uid}
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