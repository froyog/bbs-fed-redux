// callApi middleware.
// refer to https://github.com/reactjs/redux/tree/master/examples/real-world for more comments

import { camelizeKeys } from 'humps';


export const CALL_API = 'Call API';

let API_ROOT;

if (process.env.NODE_ENV === 'production') {
    API_ROOT = 'https://bbs.tju.edu.cn/api';
} else if (process.env.NODE_ENV === 'development') {
    API_ROOT = 'https://bbs.tju.edu.cn/testapi';
}


const fetchApi = (apiPath, request = {}, state = {}) => {
    const fullUrl = `${API_ROOT}/${apiPath}`;
    const { headers, body, method } = request;
    let customRequest = {};

    if (method) {
        customRequest.method = method.toUpperCase();
    }
    if (body) {
        customRequest.body = body;
    }
    if (headers) {
        const { contentType, auth } = headers;
        customRequest.headers = {};

        if (contentType) {
            customRequest.headers['Content-Type'] = contentType;
        }
        if (auth) {
            customRequest.headers['Authentication'] = auth;
        }
    }

    return (
        fetch(fullUrl, customRequest)
            .then(res => res.json())
            .then(json => {
                if (json.err) {
                    return Promise.reject(json);
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

    let { apiPath, types, request } = callAPI;

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

    return fetchApi(apiPath, request, store.getState()).then(
        response => next(actionWith({
            json: response,
            type: successType
        })),
        error => next(actionWith({
            error: error.data || '网络连接错误',
            type: failureType
        }))
    );
};
