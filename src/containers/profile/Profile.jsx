import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toJS } from '../../util';
import Profile from '../../components/profile/Profile';
import {  } from '../../actions/'

class ProfileWrapper extends React.Component {
    componentWillMount () {
        const { getProfile } = this.props;
        getProfile && getProfile();
    }

    render () {
        return (
            <Profile />
        )
    }
}

const mapStateToProps = () => {

};
const mapDispatchToProps = dispatch => ({
    getProfile: () => dispatch()
});
ProfileWrapper = connect(mapStateToProps, mapDispatchToProps)(toJS(Profile))

export default ProfileWrapper;