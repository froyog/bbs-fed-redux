import { Map, fromJS } from 'immutable';

const bypassing = ({ types, mapActionToKey }) => {
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected types to be an array of three elements.');
    }

    const [requestType, successType, failureType] = types;

    const bypassState = (
        state = fromJS({
            isFetching: false,
            items: null,
            error: '',
        }),
        action
    ) => {
        switch (action.type) {
            case requestType:
                return state.set('isFetching', true);
            case successType:
                return Map({
                    isFetching: false,
                    items: fromJS(action.json.data),
                    error: '',
                });
            case failureType:
                return state.set('isFetching', false).set('error', action.error);
            default:
                return state;
        }
    };

    // if no keys specificated, return bypassing state
    if (!mapActionToKey) return bypassState;

    // get key from action if mapActionToKey provided
    return (state = Map(), action) => {
        switch (action.type) {
            case requestType:
            case successType:
            case failureType:
                const key = mapActionToKey(action);
                return state.set(key, bypassState(state.get(key), action));
            default:
                return state;
        }
    };
};

export default bypassing;
