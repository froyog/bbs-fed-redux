import React from 'react';
import PropTypes from 'prop-types';


const ForumList = props => {
    const { isFetching, forums } = props;
    const renderForums = forums.map((forum) => {
        const { name, c_board, id, info } = forum;
        return (
            <li key={id}>
                <p>Name: {name}</p>
                <p>Info: {info}</p>
                <p>Board Count: {c_board}</p>
            </li>
        );
    });
    const renderLoadingStatus = isFetching && <h2>Loading...</h2>;

    return (
        <ul>
            {renderLoadingStatus}
            {renderForums}
        </ul>
    );
};

ForumList.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    forums: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        info: PropTypes.string.isRequired,
        c_board: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired
    }).isRequired).isRequired
};

export default ForumList;
