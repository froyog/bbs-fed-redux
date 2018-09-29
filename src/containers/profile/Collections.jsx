import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toJS } from '../../util';
import { getFollowingsIfNeeded, getCollectionsIfNeeded } from '../../actions/profile/collections';
import { LoadingLines } from '../../components/common/Loading';
import { Collections, Followings } from '../../components/profile/Collections';

class CollectionsWrapper extends React.Component {
    static propTypes = {
        getCollections: PropTypes.func.isRequired,
        getFollowings: PropTypes.func.isRequired,
        collectionsState: PropTypes.shape({
            isFetching: PropTypes.bool,
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    title: PropTypes.string,
                    boardId: PropTypes.number,
                    boardName: PropTypes.string,
                    authorId: PropTypes.number,
                    authorName: PropTypes.string,
                    authorNickname: PropTypes.string,
                    cPost: PropTypes.number,
                    bTop: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
                    bElite: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
                    tReply: PropTypes.number,
                    tCreate: PropTypes.number,
                    tModify: PropTypes.number,
                })
            ),
            error: PropTypes.string,
        }),
        followingsState: PropTypes.shape({
            isFetching: PropTypes.bool,
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    forumId: PropTypes.number,
                    forumName: PropTypes.string,
                    name: PropTypes.string,
                    info: PropTypes.string,
                    cThread: PropTypes.number,
                })
            ),
            error: PropTypes.string,
        }),
    };

    componentWillMount() {
        const { getFollowings, getCollections } = this.props;
        getFollowings && getFollowings();
        getCollections && getCollections();
    }

    render() {
        const {
            isFetching: collectionsIsFetching,
            items: collections,
        } = this.props.collectionsState;
        const { isFetching: followingsIsFetching, items: followings } = this.props.followingsState;

        if (collectionsIsFetching || followingsIsFetching) return <LoadingLines />;
        return (
            <div className="profile-collections">
                {followings && followings.length ? (
                    <div>
                        <h4>关注的板块</h4>
                        <Followings items={followings} />
                    </div>
                ) : (
                    <h4>您没有关注任何板块</h4>
                )}
                {collections && collections.length ? (
                    <div>
                        <h4>收藏的帖子</h4>
                        <Collections items={collections} />
                    </div>
                ) : (
                    <h4>您没有收藏任何帖子</h4>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        collectionsState: state.getIn(['bypassing', 'collections']),
        followingsState: state.getIn(['bypassing', 'followings']),
    };
};
const mapDispatchToProps = dispatch => ({
    getCollections: () => dispatch(getCollectionsIfNeeded()),
    getFollowings: () => dispatch(getFollowingsIfNeeded()),
});
CollectionsWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(CollectionsWrapper));

export default CollectionsWrapper;
