import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/common/loading.less';

export const LoadingDots = () => (
    <div className="three-dots-loader">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
    </div>
);

export const LoadingSpinner = () => <div className="cp-spinner cp-hue" />;

export const LoadingLines = ({ className }) => (
    <div className={`animated-background${className ? ' ' + className : ''}`}>
        <div className="shadow-masker word-speartor" />
        <div className="shadow-masker line-speartor" />
        <div className="shadow-masker word-speartor" />
        <div className="shadow-masker word-speartor" />
        <div className="shadow-masker word-speartor" />
        <div className="shadow-masker line-speartor" />
        <div className="shadow-masker word-speartor" />
        <div className="shadow-masker line-speartor" />
        <div className="shadow-masker" />
        <div className="shadow-masker word-speartor" />
        <div className="shadow-masker line-speartor" />
        <div className="shadow-masker word-speartor" />
        <div className="shadow-masker word-speartor" />
        <div className="shadow-masker word-speartor" />
        <div className="shadow-masker line-speartor" />
        <div className="shadow-masker word-speartor" />
    </div>
);

export const FetchingOverlay = ({ fullPage }) => (
    <div
        className="fetching-overlay"
        style={{
            position: fullPage ? 'fixed' : 'absolute',
            backgroundColor: `rgba(255, 255, 255, ${fullPage ? 1 : 0.6})`,
            zIndex: fullPage ? 11 : 10,
        }}
    >
        <div className="loader-inner">
            <div className="loader-line-wrap">
                <div className="loader-line" />
            </div>
            <div className="loader-line-wrap">
                <div className="loader-line" />
            </div>
            <div className="loader-line-wrap">
                <div className="loader-line" />
            </div>
            <div className="loader-line-wrap">
                <div className="loader-line" />
            </div>
            <div className="loader-line-wrap">
                <div className="loader-line" />
            </div>
        </div>
    </div>
);

FetchingOverlay.propTypes = {
    fullPage: PropTypes.bool.isRequired,
};
FetchingOverlay.defaultProps = {
    fullPage: false,
};
