export default (dispatch, getState) => next => action => {
    if (action.type === 'LOGIN_SUCCESS') {
        localStorage.setItem('user', JSON.stringify(action.json.data));
    }
    if (action.type === 'LOGOUT_SUCCESS') {
        localStorage.removeItem('user');
    }

    return next(action);
};
