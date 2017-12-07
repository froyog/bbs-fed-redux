import { Map, fromJS } from 'immutable';

const bypassing = ({ types, mapActionToKey }) => {
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected types to be an array of three elements.');
    }
    if (!types.every(t => typeof t === 'string')) {
        throw new Error('Expected types to be strings.');
    }
    if (typeof mapActionToKey !== 'function') {
        throw new Error('Expected mapActionToKey to be a function.');
    }
    const [ requestType, successType, failureType ] = types;

    const bypassState = (state = fromJS({
        isFetching: false,
        items: null,
        error: ''
    }), action) => {
        switch (action.type) {
            case requestType:
                return state.set('isFetching', true);
            case successType:
                return Map({
                    'isFetching': false,
                    'items': fromJS(action.json.data),
                    'error': ''
                });
            case failureType:
                return state
                    .set('isFetching', false)
                    .set('error', action.error);
        }
    };

    return (state = Map(), action) => {
        switch (action.type) {
            case requestType:
            case successType:
            case failureType:
                const key = mapActionToKey(action);
                if (typeof key !== 'string') {
                    throw new Error('Expected key to be a string');
                }
                return state.set(key, bypassState(state.get(key), action));
            default:
                return state;
        }
    };
};

export default bypassing;