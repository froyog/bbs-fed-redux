import React from 'react';
import PropTypes from 'prop-types';
import FetchingOverlay from '../common/FetchingOverlay';
import { Card } from '../common/Card';


const Board = ({ isFetching, boardInfo, threads }) => {
    return (
        <Card>
            {isFetching && <FetchingOverlay />}
            <h1>hahaha</h1>
        </Card>
    );
};

export default Board;
