import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Media } from 'react-bootstrap';
import Time from '../common/Time';
import Avatar from '../common/Avatar';

import '../../styles/rank/rank.less';

const RankPage = ({ data, type }) => {
    const { after, rank } = data;
    let typeInChinese;
    if (type === 'week') {
        typeInChinese = '周';
    } else if (type === 'month') {
        typeInChinese = '月';
    }
    return (
        <ul className="rank-wrapper">
            {rank.map((user, index) => {
                const { points, name, nickname, signature, id, pointsInc } = user;
                return (
                    <li>
                        <h1 className="rank-index">{index + 1}</h1>
                        <Media key={id}>
                            <Media.Left align="middle">
                                <Avatar className="avatar" id={id} name={name} />
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>
                                    <Link to={`/user/${id}`}>{name}</Link>
                                    <small className="text-muted">（{nickname}）</small>
                                </Media.Heading>
                                <p className="signature">
                                    {signature || '这个人很懒什么都没有留下'}
                                </p>
                                <p className="points">
                                    <span>
                                        本{typeInChinese}
                                        获得积分：
                                        {pointsInc}
                                    </span>
                                    <span>
                                        总积分：
                                        {points}
                                    </span>
                                </p>
                            </Media.Body>
                        </Media>
                    </li>
                );
            })}
            <p>
                从 <Time timestamp={after} absolute /> 开始计算分数
            </p>
        </ul>
    );
};

RankPage.propTypes = {
    data: PropTypes.shape({
        after: PropTypes.number,
        rank: PropTypes.arrayOf(
            PropTypes.shape({
                points: PropTypes.number,
                name: PropTypes.string,
                nickname: PropTypes.string,
                tCreate: PropTypes.number,
                cOnline: PropTypes.number,
                signature: PropTypes.string,
                id: PropTypes.number,
                pointsInc: PropTypes.number,
            })
        ),
    }),
};

export default RankPage;
