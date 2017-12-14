import React from 'react';
import PropTypes from 'prop-types';
import { getMessages, refreshMessages, clearUnreadTag } from '../../actions/profile/messages';
import { connect } from 'react-redux';
import { toJS } from '../../util';
import { FetchingOverlay, LoadingDots, LoadingLines } from '../../components/common/Loading';
import MessageBase from './MessageBase';
import { Button } from 'react-bootstrap';


class Messages extends React.Component {
    static propTypes = {
        getMessages: PropTypes.func.isRequired,
        refreshMessages: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        messages: PropTypes.arrayOf(PropTypes.shape({
            authorId: PropTypes.number,
            authorName: PropTypes.string,
            authorNickname: PropTypes.string,
            id: PropTypes.number,
            read: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
            tCreate: PropTypes.number,
            tag: PropTypes.number,
            content: PropTypes.shape({
                content: PropTypes.string,
                floor: PropTypes.number,
                status: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
                threadId: PropTypes.number,
                threadTitle: PropTypes.string,
                tCreate: PropTypes.number,
                tModify: PropTypes.number,
                id: PropTypes.number
            })
        }))
    }

    constructor () {
        super();
        this.state = {
            page: 0
        };

        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    componentWillMount () {
        this.props.getMessages(this.state.page);
    }

    componentWillUnmount () {
        const { clearUnreadTag } = this.props;
        clearUnreadTag && clearUnreadTag();
    }

    handleLoadMore () {
        const { page } = this.state;
        this.props.getMessages(page + 1);
        this.setState({
            page: page + 1
        });
    }

    render () {
        const { isFetching, messages, error } = this.props;
        console.log(this.props);

        if (isFetching && !messages.length) return <LoadingLines />
        if (!messages.length) return <p>您似乎来到了消息的荒原...</p>;

        return (
            <div>
                { messages.map(message => {
                    return <MessageBase key={message.id} message={message} />;
                }) }
                <Button
                    className="load-more"
                    block
                    bsStyle="link"
                    onClick={this.handleLoadMore}
                    disabled={isFetching}
                >
                    { isFetching ? <LoadingDots /> : '更多消息' }
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const messagesState = state.get('messages');
    return {
        'isFetching': messagesState.get('isFetching'),
        'messages': messagesState.get('messages'),
        'error': messagesState.get('error')
    };
};
const mapDispatchToProps = dispatch => ({
    getMessages: page => dispatch(getMessages(page)),
    refreshMessages: () => dispatch(refreshMessages()),
    clearUnreadTag: () => dispatch(clearUnreadTag())
});
Messages = connect(mapStateToProps, mapDispatchToProps)(toJS(Messages));

export default Messages;