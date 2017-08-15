import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/common/card.less';

export const Card = ({ className, topBorder, children, ...restProps }) => {
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
};

Card.propTypes = {
    className: PropTypes.string,
    topBorder: PropTypes.bool
};

export const CardImage = ({ image, alt, title, className, children }) => {
    const customClassName = className ? `card ${className}` : 'card';
    const customContent = children && <div className="card-content">{children}</div>;

    return (
        <div className={customClassName}>
            <div className="card-image">
                <img src={image} alt={alt} />
                <h1>{title}</h1>
            </div>
            {customContent}
        </div>
    );
};

CardImage.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string,
    className: PropTypes.string
};
