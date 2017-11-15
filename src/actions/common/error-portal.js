export const SHOW_ERROR_MODAL = 'SHOW_ERROR_MODAL';
export const HIDE_ERROR_MODAL = 'HIDE_ERROR_MODAL';

export const toggleErrorModal = toggleStatus => (dispatch, getState) => {
    if (!toggleStatus) {
        return dispatch({
            type: HIDE_ERROR_MODAL
        });
    }
    // show modal...
    if (!getState().get('errorModalIsShow')) {
        return dispatch({
            type: SHOW_ERROR_MODAL
        });
    }
};

export const showErrorModal = () => (dispatch, getState) => {
    if (!getState().get('errorModalIsShow')) {
        return dispatch({
            type: SHOW_ERROR_MODAL
        });
    }
};

export const hideErrorModal = () => dispatch => {
    return dispatch({
        type: HIDE_ERROR_MODAL
    });
};