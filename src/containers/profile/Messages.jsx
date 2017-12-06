import React from 'react';
import PropTypes from 'prop-types';
import { getMessages, refreshMessages } from '../../actions/profile/messages';
import { connect } from 'react-redux';
import { toJS } from '../../util';
import { FetchingOverlay } from '../../components/common/Loading';
import MessageBase from './MessageBase';


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

    componentWillMount () {
        this.props.getMessages(0);
    }

    render () {
        const { isFetching, messages, error } = this.props;
        const renderMessages = messages.map(message => {
            return <MessageBase key={message.id} message={message} />;
        });

        if (!messages.length) return <p>您似乎来到了消息的荒原...</p>;
        return (
            <div>
                { isFetching && <FetchingOverlay /> }
                { renderMessages }
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
    refreshMessages: () => dispatch(refreshMessages())
});
Messages = connect(mapStateToProps, mapDispatchToProps)(toJS(Messages));

export default Messages;