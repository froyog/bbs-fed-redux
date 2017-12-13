import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Time from '../common/Time';


export const Followings = ({ items: followings, onDeleteFollowing }) => {
    return (
        <Table responsive striped hover>
            <thead>
                <tr>
                    <th>讨论区</th>
                    <th>板块</th>
                    <th>帖子数</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {followings.map(following => {
                    const { id, name, forumName, cThread } = following;
                    return (
                        <tr key={id}>
                            <td>{forumName}</td>
                            <td><Link to={`/forum/board/${id}/page/1`}>{name}</Link></td>
                            <td>{cThread}</td>
                            <td><a onClick={() => onDeleteFollowing(id)}>不再关注</a></td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

Followings.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        forumId: PropTypes.number,
        forumName: PropTypes.string,
        name: PropTypes.string,
        info: PropTypes.string,
        cThread: PropTypes.number
    })),
    onDeleteFollowing: PropTypes.func.isRequired
};

export const Collections = ({ items: collections, onDeleteCollection }) => 
    <Table responsive striped hover>
        <thead>
            <tr>
                <th>板块</th>
                <th>帖子标题</th>
                <th>最后回复时间</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            {collections.map(collection => {
                const { id, title, boardId, boardName, tReply } = collection;
                return (
                    <tr key={id}>
                        <td>
                            <Link to={`/forum/board/${boardId}/page/1`}>{boardName}</Link>
                        </td>
                        <td className="thread-title">
                            <Link to={`/forum/thread/${id}/page/1`}>{title}</Link>
                        </td>
                        <td><Time timestamp={tReply} absolute /></td>
                        <td><a onClick={() => onDeleteCollection(id)}>取消收藏</a></td>
                    </tr>
                );
            })}
        </tbody>
    </Table>;

Collections.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        boardId: PropTypes.number,
        boardName: PropTypes.string,
        authorId: PropTypes.number,
        authorName: PropTypes.string,
        authorNickname: PropTypes.string,
        cPost: PropTypes.number,
        bTop: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
        bElite: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
        tReply: PropTypes.number,
        tCreate: PropTypes.number,
        tModify: PropTypes.number
    }))
};