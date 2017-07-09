export const REQUEST_FORUMLIST = 'REQUEST_FORUMLIST';
export const RECEIVE_FORUMLIST = 'RECEIVE_FORUMLIST';


function requestForumList () {
    return {
        type: REQUEST_FORUMLIST

    };
}

function receiveForumList (json) {
    return {
        type: RECEIVE_FORUMLIST,
        json,
        receivedAt: Date.now()
    };
}

const fetchForumList = () => dispatch => {
    dispatch(requestForumList());
    return (
        fetch(`http://bbs.twtstudio.com:8080/api/forum`)
            .then(res => res.json())
            .then(json => {
                dispatch(receiveForumList(json));
            })
    );
};

export const getForumList = () => (dispatch, getState) => {
    const forumList = getState().get('forumList');
    if (forumList.get('items').length || forumList.get('isFetching')) {
        return null;
    }
    return dispatch(fetchForumList());
};
