import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/common/card.less';

export const Card = props => {
    const { className, topBorder, children, ...restProps } = props;
    const customClassName = className ? `card ${className}` : 'card';
    if (topBorder) {
        restProps.style = { borderTop: topBorder ? '3px solid #2565ac' : 0 };
    }

    return (
        <div
            className={customClassName}
            {...restProps}
        >
            {children}
        </div>
    );
}

Card.propTypes = {
    className: PropTypes.string,
    topBorder: PropTypes.bool
};

export const CardImage = props => {
    const { image, alt, title, className } = props;
    const customClassName = className ? `card card-image ${className}` : 'card card-image';

    return (
        <div className={customClassName}>
            <img src={image} alt={alt} />
            <h1>{title}</h1>
        </div>
    );
}

CardImage.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string,
    className: PropTypes.string
};
