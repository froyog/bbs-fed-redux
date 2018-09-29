import React from 'react';

const ImageContainer = ({ match }) => {
    const imgId = match.params.imgId;
    return (
        <div
            className="img-container"
            style={{ backgroundImage: `url(https://bbs.tju.edu.cn/api/img/${imgId})` }}
        />
    );
};

export default ImageContainer;
