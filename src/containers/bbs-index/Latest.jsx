import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { getLatest, refreshLatest } from '../../actions/bbsIndex';
import { toJS } from '../../utils/to-js';
import { Card } from '../../components/common/Card';
import FetchingOverlay from '../../components/common/FetchingOverlay';
import ThreadItem from '../../components/common/ThreadItem';


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
                <Button
                    onClick={this.handleRefresh.bind(this)}
                    className="refresh-button raised"
                    bsStyle="success"
                >
                    刷新
                </Button>
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
