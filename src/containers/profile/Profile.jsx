import React from 'react';
import PropTypes from 'prop-types';
import { getProfileIfNeeded } from '../../actions/profile/profile';
import { sendPrivateMessage } from '../../actions/profile/messages';
import { showToast } from '../../actions/common/toast';
import { FetchingOverlay } from '../../components/common/Loading';
import Profile from '../../components/profile/Profile';
import { connect } from 'react-redux';
import { toJS } from '../../util';


class ProfileWrapper extends React.Component {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        getProfile: PropTypes.func,
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
        privatePayload: PropTypes.shape({
            isFetching: PropTypes.bool,
            items: PropTypes.object,
            error: PropTypes.string
        }),
        getProfile: PropTypes.func.isRequired,
        sendPrivateMessage: PropTypes.func.isRequired,
        showToast: PropTypes.func.isRequired
    }

    componentWillMount () {
        const { getProfile, uid } = this.props;
        getProfile && getProfile(uid);
    }

    componentWillReceiveProps (nextProps) {
        const { getProfile, uid: nextUid } = nextProps;
        if (nextUid !== this.props.uid) {
            getProfile && getProfile(nextUid);
        }
    }

    render () {
        const { isFetching, profile, thisUid, uid, 
            sendPrivateMessage, privateState, showToast } = this.props;
        if (!profile || isFetching) {
            return <FetchingOverlay fullPage />;
        }

        return (
            <Profile 
                isSelf={uid === 'me'}
                uid={thisUid}
                profile={profile} 
                onSendPrivateMessage={sendPrivateMessage}
                privatePayload={privateState}
                showToast={showToast}
            />
        );
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
        thisUid: uid,
        isFetching: profileState.get('isFetching'),
        profile: profileState.get('profile'),
        error: profileState.get('error'),
        privateState: state.getIn(['bypassing', 'sendPrivateMessage', +uid])
    };
};
const mapDispatchToProps = dispatch => ({
    getProfile: uid => dispatch(getProfileIfNeeded(uid)),
    sendPrivateMessage: (uid, content) => dispatch(sendPrivateMessage(uid, content)),
    showToast: message => dispatch(showToast(message))
});
ProfileWrapper = connect(mapStateToProps, mapDispatchToProps)(toJS(ProfileWrapper));

export default ProfileWrapper;