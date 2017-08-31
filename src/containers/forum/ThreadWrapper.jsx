import React from 'react';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';
import { Pagination } from 'react-bootstrap';
import { Card } from '../../components/common/Card';
import FetchingOverlay from '../../components/common/FetchingOverlay';
import { getThreadPage } from '../../actions/forum/thread';
import { toJS, isEqual } from '../../util';
import { Breadcrumb, BreadcrumbItem } from '../../components/common/Breadcrumb';
import ThreadHeader from './ThreadHeader';
import ThreadPost from './ThreadPost';

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
        })),
        boardInfo: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            forumId: PropTypes.number,
            forumName: PropTypes.string
        })
    };

    constructor () {
        super();
        this.state = {
            activePage: 1
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount() {
        const { getThreadPage, match: { params: { tid, page } } } = this.props;
        getThreadPage(+tid, page);
        this.setState({ activePage: +page });
    }

    componentWillReceiveProps(nextProps) {
        const { match: { params, params: { tid, page } } } = nextProps;
        const { getThreadPage, match: { params: oldParams } } = this.props;
        if (!isEqual(params, oldParams)) {
            this.setState({ activePage: +page });
            getThreadPage(+tid, page);
        }
    }

    handleSelect (eventKey) {
        document.body.scrollTop = 0;
        this.setState({
            activePage: eventKey
        });
        const { match: { params: { tid } }, history } = this.props;
        history.push(`/forum/thread/${tid}/page/${eventKey}`);
    }

    render () {
        const { threadInfo, postList, boardInfo, isFetching } = this.props;
        if (!postList || isFetching) return <FetchingOverlay fullPage />;

        const { cPost, title } = threadInfo;
        const { id: boardId, name } = boardInfo;
        const renderPostList = postList.map(post =>
            <ThreadPost key={post.id} post={post} />
        );

        return (
            <div>
                <Breadcrumb>
                    <BreadcrumbItem to="/">首页</BreadcrumbItem>
                    <BreadcrumbItem to="/forum">所有分区</BreadcrumbItem>
                    <BreadcrumbItem to={`/forum/board/${boardId}/page/1`}>
                        {name}
                    </BreadcrumbItem>
                    <BreadcrumbItem to='./1' active>
                        主题贴
                    </BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    {title &&
                        // check whether we're on page one
                        <ThreadHeader
                            thread={threadInfo}
                            board={boardInfo} /> }
                    {/*<Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        maxButtons={3}
                        bsSize="medium"
                        items={Math.ceil(cPost / 50)}
                        activePage={this.state.activePage}
                        onSelect={this.handleSelect} />*/}
                    {renderPostList}
                    <Pagination
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            maxButtons={3}
                            bsSize="medium"
                            items={Math.ceil(cPost / 50)}
                            activePage={this.state.activePage}
                            onSelect={this.handleSelect} />
                </Card>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const page = ownProps.match.params.page;
    const thread = state.getIn(['thread', page]);
    if (!thread) return {};

    return {
        isFetching: thread.get('isFetching'),
        tid: thread.get('tid'),
        threadInfo: thread.get('threadInfo'),
        postList: thread.get('postList'),
        boardInfo: thread.get('boardInfo')
    };
};
const mapDispatchToProps = dispatch => ({
    getThreadPage: (tid, page) => dispatch(getThreadPage(tid, page))
});
ThreadWrapper = connect(mapStateToProps, mapDispatchToProps)(toJS(ThreadWrapper));
export default ThreadWrapper;
