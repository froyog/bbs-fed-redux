import React from 'react';
import PropTypes from 'prop-types';
import { getMessages } from '../../actions/profile/messages';
import { connect } from 'react-redux';
import { toJS } from '../../util';

class Messages extends React.Component {
    static propTypes = {
        getMessages: PropTypes.func.isRequired,
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
        return (
            <p>messages</p>
        )
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
    getMessages: page => dispatch(getMessages(page))
});
Messages = connect(mapStateToProps, mapDispatchToProps)(toJS(Messages));

export default Messages;