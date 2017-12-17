import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Carousel, Media } from 'react-bootstrap';
import Time from './common/Time';
import Avatar from './common/Avatar';


export const Announce = ({ items, error }) => {
    return (
        <ul className="announcement-list">
            {items.map(announcement => {
                const { id, title } = announcement;
                return (
                    <li key={id}>
                        <Link to={`/forum/thread/${id}/page/1`}>{title}</Link>
                    </li>
                );
            })}
        </ul>
    );
};

export const CarouselAd = ({ adList }) => {
    return (
        <Carousel 
            className="index-carousel"
            prevIcon={null}
            nextIcon={null}
            interval={3000}
            pauseOnHover={true}
        >
            { adList.map(ad => {
                const { id, img, src: href } = ad;
                return (
                    <Carousel.Item key={id}>
                        <a href={href}>
                            <img 
                                src={`https://bbs.tju.edu.cn/api/img/${img}`} 
                                alt="Ad Image"
                            />
                        </a>
                    </Carousel.Item>
                );
            }) }
        </Carousel>
    );
};

CarouselAd.propTypes = {
    adList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        img: PropTypes.number,
        src: PropTypes.string
    }))
};

export const IndexRank = ({ rankData }) => {
    const [ startTime, rankList ] = rankData;
    return (
        <div>
            <ul className="rank-list">
                {rankList.map(user => {
                    const { id, name, pointInc } = user;
                    return (
                        <Media key={id}>
                            <Media.Left align="middle">
                                <Avatar 
                                    id={id} 
                                    name={name} 
                                    className="avatar"
                                />
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>{name}</Media.Heading>
                                <p>周获积分：{pointInc}</p>
                            </Media.Body>
                        </Media>
                    );
                })}
            </ul>
            <div className="action-wrapper">
                <p>开始计算于</p>
                <p><Time timestamp={startTime} absolute /></p>
                <p>去<Link to="/rank">排行榜</Link>逛逛</p>
            </div>
        </div>
    );
};

IndexRank.propTypes = {
    rankData: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            pointInc: PropTypes.number
        }))
    ]))
};