import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../common/Card';
import Avatar from '../common/Avatar';
import { Link } from 'react-router-dom';

const SearchOverlay = ({ searchItem, users }) => {
    return (
        <Card className="search-overlay">
            <Link to={`/search/${searchItem}/page/1`} className="search-link">
                <div className="search-item">搜索帖子：{searchItem}</div>
            </Link>
            <hr className="divider" />
            <div className="header">搜索用户</div>
            <ul>
                {
                    users.length 
                        ? users.map(user => {
                            const { id, name } = user;
                            return (
                                <Link to={`/user/${id}`} className="search-link">
                                    <li className="search-item" key={id}>
                                        <Avatar
                                            name={name}
                                            id={id}
                                            className="avatar"
                                        />
                                        {name}
                                    </li>
                                </Link>
                            );
                        })
                        : <li className="search-no-result">找不到用户 {searchItem}</li>
                }
            </ul>
        </Card>
    );
};

SearchOverlay.propTypes = {
    searchItem: PropTypes.string,
    users: PropTypes.array
};

export default SearchOverlay;