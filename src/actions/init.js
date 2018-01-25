// inital state from local storage
export const INIT = 'INIT';
export const initFromLocal = userState => dispatch => {
    return dispatch({ 
        type: INIT,
        userFromLocal: userState
    });
};