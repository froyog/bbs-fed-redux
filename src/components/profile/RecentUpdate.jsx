import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Card } from '../common/Card';
import Time from '../common/Time';


const RecentUpdate = ({ recentThreads }) => {
    const renderThreads = recentThreads.map(thread => {
        const { id, title, tCreate } = thread;
        return (
            <LinkContainer
                to={`/forum/thread/${id}/page/1`}
                key={id}
            >
                <ListGroupItem header={title}>
                    发布于<Time timestamp={tCreate} />
                </ListGroupItem>
            </LinkContainer>
        );
    });

    return (
        <Card title="最新动态">
            <ListGroup>
                {renderThreads}
            </ListGroup>
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