import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../common/Card';
import ThreadItem from '../common/ThreadItem';


const RecentUpdate = ({ recentThreads }) => {
    const renderThreads = recentThreads.map(thread =>
        <ThreadItem key={thread.id} thread={thread} />
    );

    return (
        <Card title="最新动态">
            {renderThreads}
            { !recentThreads.length && 
                <p>您似乎来到了帖子的荒原=.=</p>
            }
        </Card>
    );
};

RecentUpdate.propTypes = {
    recentThreads: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        bElite: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
        visibility: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
        tCreate: PropTypes.number,
        tReply: PropTypes.number
    }))
};

export default RecentUpdate;