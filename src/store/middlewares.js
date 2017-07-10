import thunk from 'redux-thunk';
import callApi from '../middlewares/callApi';

export const middlewares = [ thunk, callApi ];
