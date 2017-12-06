import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/common/loading.less';


export const LoadingDots = () => 
    <div className="three-dots-loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
    </div>;

export const LoadingSpinner = () =>
    <div className="cp-spinner cp-hue"></div>;

export const FetchingOverlay = ({ fullPage }) =>
    <div
        className="fetching-overlay"
        style={{
            position: fullPage ? 'fixed' : 'absolute',
            backgroundColor: `rgba(255, 255, 255, ${fullPage ? 1 : .6})`,
            zIndex: fullPage ? 11 : 10
        }}
    >
        <div className="loader-inner">
            <div className="loader-line-wrap">
                <div className="loader-line"></div>
            </div>
            <div className="loader-line-wrap">
                <div className="loader-line"></div>
            </div>
            <div className="loader-line-wrap">
                <div className="loader-line"></div>
            </div>
            <div className="loader-line-wrap">
                <div className="loader-line"></div>
            </div>
            <div className="loader-line-wrap">
                <div className="loader-line"></div>
            </div>
        </div>
    </div>;

FetchingOverlay.propTypes = {
    fullPage: PropTypes.bool.isRequired
};
FetchingOverlay.defaultProps = {
    fullPage: false
};