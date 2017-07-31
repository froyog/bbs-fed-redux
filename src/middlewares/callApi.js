import { camelizeKeys } from 'humps';


export const CALL_API = 'Call API';

const API_ROOT = 'http://bbs.tju.edu.cn:8080/api';

const fetchApi = (apiPath, headers = {}) => {
    const fullUrl = `${API_ROOT}/${apiPath}`;
    let { contentType, auth, payload } = headers;

    let customHeaders;
    if (contentType) {
        customHeaders['Content-types'] = contentType;
    }
    if (auth) {
        customHeaders['Authentication'] = `${auth.uid}|${auth.token}`;
    }
    if (payload) {
        customHeaders['body'] = payload;
    }

    return (
        fetch(fullUrl, customHeaders)
            .then(res => res.json())
            .then(json => {
                if (json.err) {
                    return Promise.reject(json.data);
                }

                const camelizedJson = camelizeKeys(json);

                return camelizedJson;
            })
    );
};


export default store => next => action => {
    const callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    let { apiPath, types, headers } = callAPI;

    if (typeof apiPath !== 'string') {
        throw new Error('Specify a string apiPath URL.');
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types');
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }

    const actionWith = data => {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];
        return finalAction;
    };

    const [ requestType, successType, failureType ] = types;
    next(actionWith({ type: requestType }));

    return fetchApi(apiPath, headers).then(
        response => next(actionWith({
            json: response,
            type: successType
        })),
        error => next(actionWith({
            error: error.data || 'Something bad happens',
            type: failureType
        }))
    );
};