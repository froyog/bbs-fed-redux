import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLatest, refreshLatest } from '../../actions/bbsIndex';
import { toJS } from '../../utils/to-js';
import { Card } from '../../components/common/Card';
import FetchingOverlay from '../../components/common/FetchingOverlay';
import ThreadItem from '../../components/common/ThreadItem';


class Latest extends React.Component {
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
                <button onClick={this.handleRefresh.bind(this)}>refresh</button>
                {isFetching && <FetchingOverlay />}
                {renderThreads}
            </Card>
        )
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
