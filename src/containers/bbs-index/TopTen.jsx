import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTopTen } from '../../actions/bbsIndex';
import { toJS } from '../../util.js';
import { Card } from '../../components/common/Card';
import { FetchingOverlay } from '../../components/common/Loading';
import ThreadItem from '../../components/common/ThreadItem';

import '../../styles/home.less';


class TopTenWrapper extends React.Component {
    static propTypes = {
        getTopTen: PropTypes.func.isRequired,
        topTenThreads: PropTypes.arrayOf(PropTypes.shape({
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

    componentWillMount() {
        this.props.getTopTen();
    }

    componentWillReceiveProps (nextProps) {
        const { error } = nextProps;
        if (error) {
            // fire error modal
        }
    }

    render () {
        const { topTenThreads, isFetching } = this.props;
        let renderThreads;

        if (!topTenThreads || isFetching) {
            return <FetchingOverlay fullPage />;
        }
        if (!topTenThreads || !topTenThreads.length) {
            renderThreads = <p className="text-center">您似乎来到了帖子的荒原 :(</p>;
        } else {
            renderThreads = topTenThreads.map(topTenThreads =>
                <ThreadItem key={topTenThreads.id} thread={topTenThreads} />
            );
        }


        return (
            <Card title="全站十大" className="card-home">
                {renderThreads}
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const topTen = state.getIn(['bbsIndex', 'topTen']);

    if (!topTen) return {};
    return {
        isFetching: topTen.get('isFetching'),
        topTenThreads: topTen.get('items'),
        error: topTen.get('error')
    };
};
const mapDispatchToProps = {
    getTopTen
};
TopTenWrapper = connect(mapStateToProps, mapDispatchToProps)(toJS(TopTenWrapper));

export default TopTenWrapper;
