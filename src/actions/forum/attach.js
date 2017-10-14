import { CALL_API } from '../../middlewares/callApi';


export const ATTACH_UPLOAD_REQUEST = 'ATTACH_UPLOAD_REQUEST';
export const ATTACH_UPLOAD_SUCCESS = 'ATTACH_UPLOAD_SUCCESS';
export const ATTACH_UPLOAD_FAILURE = 'ATTACH_UPLOAD_FAILURE';

export const uploadAttach = fileData => dispatch => {
    dispatch({
        [CALL_API]: {
            types: [ATTACH_UPLOAD_REQUEST, ATTACH_UPLOAD_SUCCESS, ATTACH_UPLOAD_FAILURE],
            apiPath: `attach`,
            request: {
                method: 'POST',
                body: fileData,
                headers: {
                    auth: true
                }
            }
        }
    });
};
