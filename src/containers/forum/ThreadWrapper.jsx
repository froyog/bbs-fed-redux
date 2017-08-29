import React from 'react';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';
import { Card } from '../../components/common/Card';
import { getThreadPage } from '../../actions/forum/thread';
import { toJS } from '../../util';

class ThreadWrapper extends React.Component {
    static propTypes = {
        getThreadPage: PropTypes.func.isRequired,
        isFetching: PropTypes.bool,
        tid: PropTypes.number,
        threadInfo: PropTypes.shape({
            cPost: PropTypes.number,
            authorId: PropTypes.number,
            blocked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
            anonymous: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
            visibility: PropTypes.number,
            tModify: PropTypes.number,
            tCreate: PropTypes.number,
            authorName: PropTypes.string,
            like: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
            title: PropTypes.string,
            content: PropTypes.string,
            authorNickname: PropTypes.string,
            id: PropTypes.number
        }),
        postList: PropTypes.arrayOf(PropTypes.shape({
            authorId: PropTypes.number,
            floor: PropTypes.number,
            anonymous: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
            tCreate: PropTypes.number,
            tModify: PropTypes.number,
            authorName: PropTypes.string,
            like: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
            content: PropTypes.string,
            id: PropTypes.number
        }))
    };

    componentWillMount() {
        const { getThreadPage, match: { params: { tid } } } = this.props;
        getThreadPage(+tid, 1);
    }

    render () {
        console.log(this.props);
        return (
            <Card>

            </Card>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const page = ownProps.match.params.page;
    const thread = state.getIn(['thread', +page]);
    if (!thread) return {};

    return {
        isFetching: thread.get('isFetching'),
        tid: thread.get('tid'),
        threadInfo: thread.get('threadInfo'),
        postList: thread.get('postList')
    };
};
const mapDispatchToProps = dispatch => ({
    getThreadPage: (tid, page) => dispatch(getThreadPage(tid, page))
});
ThreadWrapper = connect(mapStateToProps, mapDispatchToProps)(toJS(ThreadWrapper));
export default ThreadWrapper;
