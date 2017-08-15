import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/common/loading.less';

const FetchingOverlay = () =>
    <div className="fetching-overlay">
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

export default FetchingOverlay;
