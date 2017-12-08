import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Profile from './Profile';
import { toJS } from '../../util';
import RecentUpdate from '../../components/profile/RecentUpdate';
import { Medal, Title, Friends } from '../../components/profile/Widgets';
import Properties from './Properties';


class UserBase extends React.Component {
    static propTypes = {
        points: PropTypes.number,
        cThread: PropTypes.number,
        cPost: PropTypes.number
    }

    componentWillReceiveProps (nextProps) {
        const {selfUid, match, history } = nextProps;
        if (selfUid === match.params.uid) {
            // it is me
            history.push('/user/me/messages');
        }
    }

    render () {
        const { match: { params: { uid } }, recentUpdates, points, cThread, cPost } = this.props;
        const renderRecentUpdates = recentUpdates && <RecentUpdate recentThreads={recentUpdates} />;
        
        return (
            <div>
                <Profile uid={uid} />
                <Row>
                    <Col lg={8}>
                        {
                            uid === 'me'
                                ? <Properties />
                                : renderRecentUpdates
                        }
                    </Col>
                    <Col lg={4}>
                        <Title 
                            points={points}
                            cThread={cThread}
                            cPost={cPost}
                        />
                        <Medal />
                        {
                            uid === 'me' &&
                            <Friends />
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let uid = ownProps.match.params.uid;
    const selfUid = state.getIn(['user', 'uid']);
    if (uid === 'me') {
        // get self uid from state
        uid = selfUid;
    }

    const profileState = state.getIn(['profiles', +uid]);
    if (!profileState) return {};

    return {
        selfUid: selfUid,
        recentUpdates: profileState.getIn(['profile', 'recent']),
        points: profileState.getIn(['profile', 'points']),
        cThread: profileState.getIn(['profile', 'cThread']),
        cPost: profileState.getIn(['profile', 'cPost'])
    };
};
UserBase = connect(mapStateToProps)(toJS(UserBase));

export default UserBase;
