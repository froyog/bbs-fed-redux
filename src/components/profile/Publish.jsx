import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import ThreadRenderer from '../forum/ThreadRenderer';
import { LoadingLines, FetchingOverlay } from '../common/Loading';
import Time from '../common/Time';


const renderPublishList = items => {
    return items.map(thread => {
        const { id, title, tCreate, cPost, content } = thread;
        return (
            <ListGroupItem className="publish-thread-wrapper">
                <Link 
                    className="thread-title" 
                    to={`/forum/thread/${id}/page/1`}
                >
                    {title}
                </Link>
                <ThreadRenderer content={content} />
                <div className="statistics">
                    <span>
                        <i className="iconfont icon-talk"></i>
                        {cPost}
                    </span>
                    <span>
                        <i className="iconfont icon-clock"></i>
                        <Time timestamp={tCreate} />
                    </span>
                </div>
                <Button bsStyle="link" className="float delete-button">
                    <i className="iconfont icon-delete"></i>
                </Button>
            </ListGroupItem>
        );
    });
};

const renderReplyList = items => {
    return items.map(post => {
        const { threadId, floor, tCreate, anonymous, threadTitle, content } = post;
        return (
            <ListGroupItem className="publish-thread-wrapper">
                <Link
                    className="thread-title"
                    to={`/forum/thread/${threadId}/page/1`}
                >
                    {threadTitle}
                    <small className="anonymous">
                        {anonymous ? '[已匿名]' : null}
                    </small>
                </Link>
                <ThreadRenderer content={content} />
                <div className="statistics">
                    <span className="floor"># {floor}</span>
                    <span>
                        <i className="iconfont icon-clock"></i>
                        <Time timestamp={tCreate} />
                    </span>
                </div>
                <Button bsStyle="link" className="float delete-button">
                    <i className="iconfont icon-delete"></i>
                </Button>
            </ListGroupItem>
        );
    });
};

export class PublishList extends React.Component {
    static propTypes = {
        publishState: PropTypes.shape({
            isFetching: PropTypes.bool,
            items: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number,
                title: PropTypes.string,
                tCreate: PropTypes.number,
                cPost: PropTypes.number,
                content: PropTypes.string,
                bElite: PropTypes.oneOfType([ PropTypes.number, PropTypes.bool ])
            })),
            error: PropTypes.string
        }),
        onLoadMorePage: PropTypes.func.isRequired
    }

    constructor () {
        super();
        // page here for maintaining the state only
        // not pagination or location control
        this.state = {
            page: 0,
            isExpand: true
        };

        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.handleToggleExpand = this.handleToggleExpand.bind(this);
    }

    handleLoadMore () {
        const { onLoadMorePage } = this.props;
        const { page } = this.state;
        this.setState({
            page: page + 1
        });
        onLoadMorePage && onLoadMorePage(page + 1);
    }

    handleToggleExpand () {
        this.setState({
            isExpand: !this.state.isExpand
        });
    }

    render () {
        const { publishState, type } = this.props;
        if (!publishState || (publishState.isFetching && !publishState.items.length)) {
            return <LoadingLines className="publish-loading-lines"/>;
        }

        const { isFetching, items, error } = publishState;
        const { isExpand } = this.state;
        if (error) return <p>出现错误了</p>;
    
        return (
            <div style={{ position: 'relative' }}>
                <div className="publish-header clearfix">
                    <h3 className="pull-left">
                        { type === 'thread' && '发帖' }
                        { type === 'post' && '回帖' }
                    </h3>
                    <Button 
                        className="pull-right flat expand-button"
                        bsStyle="link"
                        onClick={this.handleToggleExpand}
                    >
                        { isExpand ? '收起' : '展开' }
                    </Button>
                </div>
                {
                    isExpand &&
                    <ListGroup>
                        { type === 'thread' && renderPublishList(items) }
                        { type === 'post' && renderReplyList(items) }
                        <Button
                            bsStyle="link" 
                            className="load-more"
                            block
                            onClick={this.handleLoadMore}
                        >
                            加载更多
                        </Button>
                    </ListGroup>
                }
                { isFetching && <FetchingOverlay /> }
            </div>
        );
    }
}