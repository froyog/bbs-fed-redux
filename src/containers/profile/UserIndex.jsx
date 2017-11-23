import React from 'react';
// import PropTypes from 'prop-types';
import Profile from './Profile';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { toJS } from '../../util';
import RecentUpdate from '../../components/profile/RecentUpdate';
import { Medal, Title } from '../../components/profile/Widgets';


class UserIndex extends React.Component {
    render () {
        const { match: { params: { uid } }, recentUpdates } = this.props;
        const renderFriends = uid === 'me' ? <Friends /> : null;
        const renderRecentUpdates = recentUpdates && <RecentUpdate recentThreads={recentUpdates} />;
        
        return (
            <div>
                <Profile uid={uid} />
                <Row>
                    <Col lg={4}>
                        <Title />
                        <Medal />
                        {renderFriends}
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
    };
};
UserIndex = connect(mapStateToProps)(toJS(UserIndex));

export default UserIndex;
