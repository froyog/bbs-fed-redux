import React from 'react';
import PropTypes from 'prop-types';
import asyncComponent from '../../asyncComponent';
import { connect} from 'react-redux';
import { Pagination } from 'react-bootstrap';
import { Card } from '../../components/common/Card';
import { FetchingOverlay } from '../../components/common/Loading';
import { getThreadPage, refreshThread } from '../../actions/forum/thread';
import { toJS, isEqual } from '../../util';
import { Breadcrumb, BreadcrumbItem } from '../../components/common/Breadcrumb';
import ThreadHeader from './ThreadHeader';
import ThreadPost from './ThreadPost';
import { ErrorOverlay } from '../../components/common/ErrorModal';
import '../../styles/forum/thread.less';
// import ThreadEditor from './ThreadEditor';
const AsyncThreadEditor = asyncComponent(() => import('./ThreadEditor'));


class ThreadWrapper extends React.PureComponent {
    static propTypes = {
        getThreadPage: PropTypes.func.isRequired,
        isFetching: PropTypes.bool,
        error: PropTypes.string,
        tid: PropTypes.number,
        
        threadInfo: PropTypes.shape({
            cPost: PropTypes.number,
            authorId: PropTypes.number,
            bLocked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
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
            activePage: 1,
            replyContent: '',
            isLock: false,
            replyId: 0
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.handleClickReply = this.handleClickReply.bind(this);
        this.handleCancelReply = this.handleCancelReply.bind(this);
        this.handleRefreshPage = this.handleRefreshPage.bind(this);
        this.handleSubmitIsLock = this.handleSubmitIsLock.bind(this);
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

    handleClickReply (replyId, replyContent) {
        this.setState({
            replyId, 
            replyContent,
        });
        
    }

    handleSubmitIsLock (isLock) {
        this.setState({ isLock: isLock });
    }     
    
    handleCancelReply () {
        this.setState({ replyContent: '' });
    }

    handleRefreshPage (page) {
        const { threadInfo: { cPost }, 
            getThreadPage,
            refreshThread, 
            match: { params: { tid } } } = this.props;
        
        let targetPage;
        if (page === 'last') {
            targetPage = String(Math.ceil((cPost + 1) / 50));
        } else {
            targetPage = page ? String(page) : '1';
        }
        
        refreshThread(targetPage);
        getThreadPage(+tid, targetPage);
        this.setState({
            replyContent: ''
        });
    }
   
    render () {
        const { threadInfo, postList, boardInfo, isFetching, 
            error, match: { params: { tid } } } = this.props;
        const { replyContent, replyId, isLock } = this.state;
        if (error) return <ErrorOverlay reason={error} needRefresh />;
        if (!postList || isFetching) return <FetchingOverlay fullPage />;

        const { cPost, title, bLocked } = threadInfo;
        const { id: boardId, name, anonymous: allowAnonymous } = boardInfo;
        const renderPostList = postList.map(post =>
            <ThreadPost
                key={post.id}
                board={boardInfo}
                post={post}
                onClickReply={this.handleClickReply} 
                onDeleteSuccess={this.handleRefreshPage}
            />
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
                            board={boardInfo}
                            onClickReply={this.handleClickReply} 
                            onEditSuccess={this.handleRefreshPage}
                            onSubmit={this.handleSubmitIsLock}
                        /> 
                    }
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
                {bLocked || isLock
                    ?
                        <div className="lock-overlay">
                        <p className='lock-p'>此帖子已被锁定</p>
                    </div>
                    :null}
                <AsyncThreadEditor
                    replyId={replyId}
                    replyContent={replyContent}
                    onCancelReply={this.handleCancelReply}
                    tid={tid}
                    onCommentSuccess={this.handleRefreshPage}
                    allowAnonymous={allowAnonymous}
                />
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
        error: thread.get('error'),
        threadInfo: thread.get('threadInfo'),
        postList: thread.get('postList'),
        boardInfo: thread.get('boardInfo'),
    };
};
const mapDispatchToProps = dispatch => ({
    getThreadPage: (tid, page) => dispatch(getThreadPage(tid, page)),
    refreshThread: page => dispatch(refreshThread(page))
});
ThreadWrapper = connect(mapStateToProps, mapDispatchToProps)(toJS(ThreadWrapper));
export default ThreadWrapper;
