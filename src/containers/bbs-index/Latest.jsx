import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { getLatest, refreshLatest } from '../../actions/bbsIndex';
import { toJS } from '../../util.js';
import { LoadingDots, FetchingOverlay} from '../../components/common/Loading';
import { Card } from '../../components/common/Card';
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
        fireErrorModal: PropTypes.func
    };

    constructor () {
        super();
        this.state = {
            page: 0
        };

        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    componentWillMount() {
        this.props.getLatest(0);
    }

    componentWillReceiveProps (nextProps) {
        const { error } = nextProps;
        if (error) {
            // fire error modal
        }
    }

    handleRefresh () {
        const { refresh, getLatest } = this.props;
        refresh();
        getLatest(0);
        this.setState({
            page: 0
        });
    }

    handleLoadMore () {
        const { page } = this.state;
        this.props.getLatest(page + 1);
        this.setState({
            page: page + 1
        });
    }

    render () {
        const { latestThreads, isFetching, error } = this.props;
        let renderThreads, renderLoadButton;

        if (error) return null;
        if (!latestThreads || !latestThreads.length) {
            renderThreads = <p className="text-center">您似乎来到了没有帖子的荒原 =.=</p>;
        } else {
            renderThreads = latestThreads.map(latestThread => {
                return <ThreadItem key={latestThread.id} thread={latestThread} />;
            });
            renderLoadButton = (
                <Button
                    className="load-more"
                    block
                    bsStyle="link"
                    onClick={this.handleLoadMore}
                    disabled={isFetching}
                >
                    { isFetching 
                        ? <LoadingDots /> 
                        : '加载更多帖子'
                    }
                </Button>
            );
        }
        
        return (
            <Card title="最新" className="card-home card-latest">
                <RefreshButton 
                    className="refresh-button"
                    isFetching={isFetching}
                    onClick={this.handleRefresh} 
                />
                { isFetching && <FetchingOverlay /> }
                { renderThreads }
                { renderLoadButton }
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const latest = state.getIn(['bbsIndex', 'latest']);

    if (!latest) return {};
    return {
        isFetching: latest.get('isFetching'),
        latestThreads: latest.get('items'),
        error: latest.get('error')
    };
};
const mapDispatchToProps = dispatch => ({
    getLatest: page => dispatch(getLatest(page)),
    refresh: () => dispatch(refreshLatest())
});
Latest = connect(mapStateToProps, mapDispatchToProps)(toJS(Latest));

export default Latest;
