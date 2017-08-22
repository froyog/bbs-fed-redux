import React from 'react';
import PropTypes from 'prop-types';
import FetchingOverlay from '../common/FetchingOverlay';
import { Card } from '../common/Card';
import Time from '../common/Time';


const Board = ({ boardInfo, threads }) => {
    const { name } = boardInfo;
    const { tReply } = threads[0];

    return (
        <Card title={name}>
            <Time timestamp={tReply} />
        </Card>
    );
};

export default Board;
