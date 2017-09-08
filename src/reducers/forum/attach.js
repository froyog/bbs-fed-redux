import { fromJS, Map } from 'immutable';
import * as ActionTypes from '../../actions/forum/attach';


const attach = (state = fromJS({
    'isFetching': false,
    'id': 0,
    'error': ''
}), action) => {
    switch (action.type) {
        case ActionTypes.ATTACH_UPLOAD_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.ATTACH_UPLOAD_SUCCESS:
            return Map({
                'isFetching': false,
                'id': action.json.data.id,
                'error': ''
            });
        case ActionTypes.ATTACH_UPLOAD_FAILURE:
            return Map({
                'isFetching': false,
                'id': 0,
                'error': action.error
            });
        default:
            return state;
    }
};

export default attach;
