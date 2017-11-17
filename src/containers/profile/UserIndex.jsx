import React from 'react';
// import PropTypes from 'prop-types';
import Profile from './Profile';


const UserIndex = ({ match }) =>
    <Profile uid={match.params.uid} />;

export default UserIndex;
