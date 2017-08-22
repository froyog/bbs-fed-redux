import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTopTen } from '../../actions/bbsIndex';
import { toJS } from '../../utils/to-js';
import { Card } from '../../components/common/Card';
import FetchingOverlay from '../../components/common/FetchingOverlay';
import ThreadItem from '../../components/common/ThreadItem';


class TopTenWrapper extends React.Component {
    static propTypes = {
        getTopTen: PropTypes.func.isRequired,
        topTenThreads: PropTypes.arrayOf(PropTypes.shape({
            boardId: PropTypes.number,
            authorId: PropTypes.number,
            authorName: PropTypes.number,
            tReply: PropTypes.number,
            boardName: PropTypes.string,
            authorName: PropTypes.string,
            title: PropTypes.string,
            id: PropTypes.number,
            cPost: PropTypes.number,
            anonymous: PropTypes.number
        })),
        isFetching: PropTypes.bool
    };

    componentWillMount() {
        const { getTopTen } = this.props;
        getTopTen();
    }

    render () {
        const { topTenThreads, isFetching } = this.props;
        if (!topTenThreads || isFetching) {
            return <FetchingOverlay fullPage />
        }

        const renderThreads = topTenThreads.map(topTenThreads =>
            <ThreadItem key={id} thread={topTenThreads} />
        )

        return (
            <Card title="全站十大">
                {renderThreads}
            </Card>
        )
    }
}

const mapStateToProps = state => {
    const topTen = state.getIn(['bbsIndex', 'topTen']);

    if (!topTen) return {};
    return {
        isFetching: topTen.get('isFetching'),
        topTenThreads: topTen.get('topTen')
    };
};
const mapDispatchToProps = dispatch => ({
    getTopTen: () => dispatch(getTopTen())
});
TopTenWrapper = connect(mapStateToProps, mapDispatchToProps)(toJS(TopTenWrapper));

export default TopTenWrapper;
