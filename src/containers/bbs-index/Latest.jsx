import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { getLatest, refreshLatest } from '../../actions/bbsIndex';
import { toJS } from '../../util.js';
import { Card } from '../../components/common/Card';
import FetchingOverlay from '../../components/common/FetchingOverlay';
import ThreadItem from '../../components/common/ThreadItem';
import RefreshButton from '../../components/common/RefreshButton';


class Latest extends React.Component {
    static propTypes = {
        getLatest: PropTypes.func.isRequired,
        refresh: PropTypes.func.isRequired,
        latestThreads: PropTypes.arrayOf(PropTypes.shape({
            boardId: PropTypes.number,
            authorId: PropTypes.number,
            tReply: PropTypes.number,
            boardName: PropTypes.string,
            authorName: PropTypes.string,
            title: PropTypes.string,
            id: PropTypes.number,
            cPost: PropTypes.number,
            anonymous: PropTypes.number
        })),
        isFetching: PropTypes.bool,
    };

    constructor () {
        super();
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    componentWillMount() {
        this.props.getLatest();
    }

    handleRefresh () {
        this.props.refresh();
        this.props.getLatest();
    }

    render () {
        const { latestThreads, isFetching } = this.props;
        if (!latestThreads) {
            return null;
        }

        const renderThreads = latestThreads.map(latestThread =>
            <ThreadItem key={latestThread.id} thread={latestThread} />
        );

        return (
            <Card title="最新" className="card-home">
                <RefreshButton 
                    className="refresh-button"
                    isFetching={isFetching}
                    onClick={this.handleRefresh} />
                {isFetching && <FetchingOverlay />}
                {renderThreads}
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const latest = state.getIn(['bbsIndex', 'latest']);

    if (!latest) return {};
    return {
        isFetching: latest.get('isFetching'),
        latestThreads: latest.get('items')
    };
};
const mapDispatchToProps = dispatch => ({
    getLatest: () => dispatch(getLatest()),
    refresh: () => dispatch(refreshLatest())
});
Latest = connect(mapStateToProps, mapDispatchToProps)(toJS(Latest));

export default Latest;
