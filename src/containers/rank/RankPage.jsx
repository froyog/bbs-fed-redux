import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toJS } from '../../util';
import { getCompleteRank } from '../../actions/rank/rank';
import { LoadingLines } from '../../components/common/Loading';
import RankPage from '../../components/rank/RankPage';
import { ErrorOverlay } from '../../components/common/ErrorModal';

class RankPageWrapper extends React.Component {
    static propTypes = {
        getCompleteRank: PropTypes.func.isRequired,
        isFetching: PropTypes.bool,
        rankList: PropTypes.shape({
            after: PropTypes.number,
            rank: PropTypes.arrayOf(
                PropTypes.shape({
                    points: PropTypes.number,
                    name: PropTypes.string,
                    nickname: PropTypes.string,
                    tCreate: PropTypes.number,
                    cOnline: PropTypes.number,
                    signature: PropTypes.string,
                    id: PropTypes.number,
                    pointsInc: PropTypes.number,
                })
            ),
        }),
        error: PropTypes.string,
    };

    componentWillMount() {
        const { getCompleteRank, type } = this.props;
        getCompleteRank && getCompleteRank(type);
    }

    componentWillReceiveProps(nextProps) {
        const { type, getCompleteRank } = nextProps;
        if (type !== this.props.type) {
            getCompleteRank && getCompleteRank(type);
        }
    }

    render() {
        const { isFetching, rankList, error } = this.props;
        if (error) return <ErrorOverlay reason={error} needRefresh />;
        if (isFetching || !rankList) return <LoadingLines />;

        return <RankPage data={rankList} />;
    }
}

const mapStateToProps = (state, ownProps) => {
    const { type } = ownProps;

    const rankStateByType = state.getIn(['rank', type]);
    if (!rankStateByType) return {};

    return {
        isFetching: rankStateByType.get('isFetching'),
        rankList: rankStateByType.get('rankList'),
        error: rankStateByType.get('error'),
    };
};
const mapDispatchToProps = dispatch => ({
    getCompleteRank: type => dispatch(getCompleteRank(type)),
});
RankPageWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(RankPageWrapper));

export default RankPageWrapper;
