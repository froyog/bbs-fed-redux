[1mdiff --git a/src/actions/forum/thread.js b/src/actions/forum/thread.js[m
[1mindex 610238f..937dba8 100644[m
[1m--- a/src/actions/forum/thread.js[m
[1m+++ b/src/actions/forum/thread.js[m
[36m@@ -38,3 +38,25 @@[m [mexport const getThreadPage = (tid, page) => (dispatch, getState) => {[m
         dispatch(fetchThreadPage(tid, page));[m
     }[m
 };[m
[32m+[m
[32m+[m[32mexport const NEW_COMMENT_REQUEST = 'NEW_COMMENT_REQUEST';[m
[32m+[m[32mexport const NEW_COMMENT_SUCCESS = 'NEW_COMMENT_SUCCESS';[m
[32m+[m[32mexport const NEW_COMMENT_FAILURE = 'NEW_COMMENT_FAILURE';[m
[32m+[m
[32m+[m[32mexport const sendNewComment = (tid, content) => (dispatch, getState) => {[m
[32m+[m[32m    const userInfo = getState().get('user');[m
[32m+[m[32m    dispatch({[m
[32m+[m[32m        [CALL_API]: {[m
[32m+[m[32m            types: [NEW_COMMENT_REQUEST, NEW_COMMENT_SUCCESS, NEW_COMMENT_FAILURE],[m
[32m+[m[32m            apiPath: `thread/${tid}`,[m
[32m+[m[32m            request: {[m
[32m+[m[32m                method: 'POST',[m
[32m+[m[32m                body: JSON.stringify({content}),[m
[32m+[m[32m                headers: {[m
[32m+[m[32m                    contentType: 'application/json',[m
[32m+[m[32m                    auth: user[m
[32m+[m[32m                }[m
[32m+[m[32m            }[m
[32m+[m[32m        }[m
[32m+[m[32m    });[m
[32m+[m[32m};[m
