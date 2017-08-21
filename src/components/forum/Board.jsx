import React from 'react';
import PropTypes from 'prop-types';
import FetchingOverlay from '../common/FetchingOverlay';
import { Card } from '../common/Card';


const Board = ({ boardInfo, threads }) => {
    const { name } = boardInfo;
    return (
        <Card title={name}>
        </Card>
    );
};

export default Board;
