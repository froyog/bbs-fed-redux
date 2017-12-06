import { Map, List, fromJS } from 'immutable';
import * as ActionTypes from '../../actions/profile/messages';


const messages = (state = fromJS({
    'isFetching': false,
    'messages': [],
    'error': '',
    'didInvaildate': false
}), action) => {
    switch (action.type) {
        case ActionTypes.GET_MESSAGE_REQUEST:
            return state
                .set('isFetching', true)
                .set('error', '');
        case ActionTypes.GET_MESSAGE_SUCCESS:
            const incomingMessages = fromJS(action.json.data);
            const finalItems = action.page === 0
                ? incomingMessages
                : incomingMessages.concat(state.getIn(['messages', 'messages']));
            return Map({
                'isFetching': false,
                'didInvaildate': false,
                'messages': finalItems,
                'error': ''
            });
        case ActionTypes.GET_MESSAGE_FAILURE:
            return Map({
                'isFetching': false,
                'error': action.error,
            });
        case ActionTypes.INVAILDATE_MESSAGES:
            return state.set('didInvaildate', true)
        default:
            return state;
    }
}

export default messages;