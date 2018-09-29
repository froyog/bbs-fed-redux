import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import '../../styles/common/refresh.less';

const RefreshButton = ({ isFetching, className, ...restProps }) => {
    const iconClassName = `iconfont icon-refresh ${isFetching ? 'animating' : ''}`;

    return (
        <Button
            className={className ? `${className} flat refresh` : 'flat refresh'}
            bsStyle="link"
            {...restProps}
        >
            <i className={iconClassName} />
            刷新
        </Button>
    );
};

RefreshButton.propTypes = {
    isFetching: PropTypes.bool,
    className: PropTypes.string,
};

export default RefreshButton;
