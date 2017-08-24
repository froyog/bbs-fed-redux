import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/common/card.less';

export const Card = ({ className, title, nopadding, action, children, ...restProps }) => {
    const customClassName = className ? `card ${className}` : 'card';

    return (
        <div
            className={customClassName}
            {...restProps}
        >
            <div className="card-content">
                <h1 className="card-title">{title}</h1>
                {children}
            </div>
            {nopadding}
            <div className="card-action">
                {action}
            </div>
        </div>
    );
};

Card.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string
};

export const CardImage = ({ image, alt, title, className, children }) => {
    const customClassName = className ? `card ${className}` : 'card';

    return (
        <div className={customClassName}>
            <div className="card-image">
                <img src={image} alt={alt} />
                <h1>{title}</h1>
            </div>
            {
                children &&
                <div className="card-content">{children}</div>
            }
        </div>
    );
};

CardImage.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string,
    className: PropTypes.string
};
