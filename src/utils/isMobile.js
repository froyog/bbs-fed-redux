const getDeviceWidth = () => window.innerWidth;

export const isMobile = breakpointWidth => {
    const width = getDeviceWidth();
    if (width > breakpointWidth) {
        return false;
    }
    return true;
}
