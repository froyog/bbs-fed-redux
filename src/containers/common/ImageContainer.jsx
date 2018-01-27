import React from 'react';
import PropTypes from 'prop-types';


const ImageContainer = ({ match }) => {
    const imgId = match.params.imgId;
    return (
        <div 
            className="img-container"
            style={{ backgroundImage: `url(https://bbs.tju.edu.cn/api/img/${imgId})` }}
        ></div>
    );
};

export default ImageContainer;