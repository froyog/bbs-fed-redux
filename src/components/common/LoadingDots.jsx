import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/common/loading.less';


const LoadingDots = () => 
    <div className="three-dots-loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
    </div>;

export default LoadingDots;