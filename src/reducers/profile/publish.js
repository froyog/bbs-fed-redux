import { Map, List, fromJS } from 'immutable';
import * as ActionTypes from '../../actions/profile/publish';

const publishReducerFactory = ({ types }) => (
    state = fromJS({
        isFetching: false,
        items: List(),
        error: '',
    }),
    action
) => {
    const [requestType, successType, failureType] = types;
    switch (action.type) {
        case requestType:
            return state.set('isFetching', true);
        case successType:
            const incomingItems = fromJS(action.json.data);
            const finalItems =
                action.page === 0 ? incomingItems : state.get('items').concat(incomingItems);
            return Map({
                isFetching: false,
                items: finalItems,
                error: '',
            });
        case failureType:
            return Map({
                isFetching: false,
                error: fromJS(action.error),
            });
        default:
            return state;
    }
};

const publishPage = (state = Map(), action) => {
    switch (action.type) {
        case ActionTypes.GET_PUBLISH_REQUEST:
        case ActionTypes.GET_PUBLISH_SUCCESS:
        case ActionTypes.GET_PUBLISH_FAILURE:
            return state.set(
                'thread',
                publishReducerFactory({
                    types: [
                        ActionTypes.GET_PUBLISH_REQUEST,
                        ActionTypes.GET_PUBLISH_SUCCESS,
                        ActionTypes.GET_PUBLISH_FAILURE,
                    ],
                })(state.get('thread'), action)
            );
        case ActionTypes.GET_REPLY_REQUEST:
        case ActionTypes.GET_REPLY_SUCCESS:
        case ActionTypes.GET_REPLY_FAILURE:
            return state.set(
                'post',
                publishReducerFactory({
                    types: [
                        ActionTypes.GET_REPLY_REQUEST,
                        ActionTypes.GET_REPLY_SUCCESS,
                        ActionTypes.GET_REPLY_FAILURE,
                    ],
                })(state.get('post'), action)
            );
        default:
            return state;
    }
};

export default publishPage;
