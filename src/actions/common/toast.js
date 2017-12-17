export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';

export const showToast = () => (dispatch, getState) => {
    if (!getState().getIn(['toast', 'isShow'])) {
        return dispatch({
            type: SHOW_TOAST
        });
    }
};

export const hideToast = () => dispatch => {
    return dispatch({
        type: HIDE_TOAST
    });
};