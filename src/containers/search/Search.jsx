import React from 'react';
import PropTypes from 'prop-types';
import { Pager } from 'react-bootstrap';
import { Card } from '../../components/common/Card';
import ThreadItem from '../../components/common/ThreadItem';
import { searchThread } from '../../actions/common/search';
import { ErrorOverlay } from '../../components/common/ErrorModal';
import { connect } from 'react-redux';
import { toJS } from '../../util';
import { FetchingOverlay } from '../../components/common/Loading';

class SearchWrapper extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool,
        result: PropTypes.arrayOf(PropTypes.shape({
            boardId: PropTypes.number,
            cPost: PropTypes.number,
            authorId: PropTypes.PropTypes.number,
            anonymous: PropTypes.oneOfType([ PropTypes.number, PropTypes.bool ]),
            tModify: PropTypes.number,
            tCreate: PropTypes.number,
            visibility: PropTypes.number,
            authorName: PropTypes.string,
            tReply: PropTypes.number,
            title: PropTypes.string,
            authorNickname: PropTypes.string,
            id: PropTypes.number
        })),
        error: PropTypes.string
    }

    constructor () {
        super();
        
        this.handleClickNext = this.handleClickNext.bind(this);
        this.handleClickPrev = this.handleClickPrev.bind(this);
    }

    componentDidMount () {
        const { match: { params: { keyword, page } }, search } = this.props;
        search(keyword, page);
    }

    componentWillReceiveProps (nextProps) {
        const { match: { params: { keyword: nextKeyword, page: nextPage } }, search } = nextProps;
        const { match: { params: { keyword, page } } } = this.props;
        if (keyword !== nextKeyword || page !== nextPage) {
            search(nextKeyword, nextPage);
            return;
        }
    }

    handleClickNext () {
        const { march: { params: { keyword, page } }, history } = this.props;
        history.push(`/search/${keyword}/page/${page + 1}`);
    }
    
    handleClickPrev () {
        const { march: { params: { keyword, page } }, history } = this.props;
        if (page === 1) {
            return;
        }
        history.push(`/search/${keyword}/page/${page - 1}`);
    }

    render () {
        const { isFetching, result, error, match: { params } } = this.props;
        if (error) return <ErrorOverlay reason={error} />;
        if (!result || isFetching) return <FetchingOverlay fullpage />;
        if (!result.length) return (
            <div>
                <h1>没有找到“{params.keyword}”相关结果</h1>
                <p>建议您：</p>
                <ul>
                    <li>请检查输入字词有无错误。</li>
                    <li>请尝试其他查询词。</li>
                    <li>请减少查询字词的数量。</li>
                </ul>
            </div>
        );

        return (
            <Card title={`帖子“${params.keyword}”搜索结果`} className="card-search">
                {/* <h1>搜索结果</h1> */}
                {result.map(thread => <ThreadItem key={thread.id} thread={thread} />)}
                <Pager>
                    <Pager.Item 
                        disabled={params.page === 1}
                        onClick={this.handleClickPrev}
                    >
                        上一页
                    </Pager.Item>
                    <Pager.Item 
                        disabled={result.length < 50}
                        onClick={this.handleClickNext}
                    >
                        下一页
                    </Pager.Item>
                </Pager>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const searchState = state.getIn(['bypassing', 'searchThread']);
    if (!searchState) return {};

    return {
        isFetching: searchState.get('isFetching'),
        result: searchState.get('items'),
        error: searchState.get('error')
    };
};
const mapDispatchToProps = dispatch => ({
    search: (keyword, page) => dispatch(searchThread(keyword, page))
});
SearchWrapper = connect(mapStateToProps, mapDispatchToProps)(toJS(SearchWrapper));
export default SearchWrapper;