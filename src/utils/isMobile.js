const getDeviceWidth = () => window.innerWidth;

export const isMobile = (breakpointWidth = 768) => {
    const width = getDeviceWidth();
    if (width > breakpointWidth) {
        return false;
    }
    return true;
};
