import React from 'react';
import PropTypes from 'prop-types';
import Profile from './Profile';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { toJS } from '../../util';
import RecentUpdate from '../../components/profile/RecentUpdate';
import { Medal, Title, Friends } from '../../components/profile/Widgets';


class UserIndex extends React.Component {
    static propTypes = {
        points: PropTypes.number,
        cThread: PropTypes.number,
        cPost: PropTypes.number
    }

    render () {
        const { match: { params: { uid } }, recentUpdates, points, cThread, cPost } = this.props;
        const renderFriends = uid === 'me' ? <Friends /> : null;
        const renderRecentUpdates = recentUpdates && <RecentUpdate recentThreads={recentUpdates} />;
        
        return (
            <div>
                <Profile uid={uid} />
                <Row>
                    <Col lg={4}>
                        <Title 
                            points={points}
                            cThread={cThread}
                            cPost={cPost}
                        />
                        <Friends />
                        <Medal />
                    </Col>
                    <Col lg={8}>
                        {renderRecentUpdates}
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const uid = ownProps.match.params.uid;
    const profileState = state.getIn(['profiles', uid]);
    if (!profileState) return {};
    

    return {
        recentUpdates: profileState.getIn(['profile', 'recent']),
        points: profileState.getIn(['profile', 'points']),
        cThread: profileState.getIn(['profile', 'cThread']),
        cPost: profileState.getIn(['profile', 'cPost'])
    };
};
UserIndex = connect(mapStateToProps)(toJS(UserIndex));

export default UserIndex;
