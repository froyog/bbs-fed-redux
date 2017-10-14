export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

export const toggleSidebar = (openStatus) => ({
    type: TOGGLE_SIDEBAR,
    isOpen: openStatus
});
