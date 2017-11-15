import React from 'react';
import PropTypes from 'prop-types';
import { getForumList } from '../../actions/forumList';
import { connect } from 'react-redux';
import { toJS } from '../../util.js';
import { FetchingOverlay } from '../../components/common/Loading';
import Forum from './ForumWrapper';
import FeelingLucky from '../../components/common/FeelingLucky';

import { Row, Col } from 'react-bootstrap';


class ForumListWrapper extends React.Component {
    static propTypes = {
        getForumList: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            info: PropTypes.string.isRequired,
            cBoard: PropTypes.number.isRequired,
            id: PropTypes.number.isRequired
        }).isRequired).isRequired
    };

    componentDidMount() {
        this.props.getForumList();
    }

    render () {
        const { isFetching, items } = this.props;
        const renderForumList = items.map(forum => {
            const fid = forum.id;
            return (
                <Forum
                    key={fid}
                    info={forum}
                />
            );
        });

        if (isFetching) return <FetchingOverlay fullPage />;
        return (
            <Row className="forum-list">
                {renderForumList}
                <Col md={12}>
                    <FeelingLucky />
                </Col>
            </Row>
        );
    }
}


const mapStateToProps = state => {
    return {
        isFetching: state.getIn(['forumList', 'isFetching']),
        items: state.getIn(['forumList', 'items']),
    };
};


ForumListWrapper = connect(mapStateToProps, {
    getForumList
})(toJS(ForumListWrapper));
export default ForumListWrapper;
