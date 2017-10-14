export const AUTH_PASS = 'AUTH_PASS';
export const AUTH_FAIL = 'AUTH_FAIL';

export const toggleAuth = (authStatus) => {
    return {
        type: authStatus
    };
};
