import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/common/card.less';


const Card = props => {
    const { header, children } = props;
    return (
        <div className="card">
            {header}
            <div className="card-content">
                {children}
            </div>
        </div>
    )
}

export default Card;
