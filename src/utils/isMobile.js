const getDeviceWidth = () => window.innerWidth;

export const isMobile = (breakpointWidth = 1000) => {
    const width = getDeviceWidth();
    if (width > breakpointWidth) {
        return false;
    }
    return true;
};
