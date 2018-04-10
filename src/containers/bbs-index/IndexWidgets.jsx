import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Announce, CarouselAd, IndexRank } from '../../components/IndexWidgets';
import { toJS } from '../../util';
import { getAnnouncements, getAdsIfNeeded, getIndexRankIfNeeded } from '../../actions/bbsIndex';
import { LoadingDots } from '../../components/common/Loading';
import { Card } from '../../components/common/Card';
import mobileQRCode from '../../assests/mobile-bbs.png';
import weiboAvatar from '../../assests/weibo-avatar.jpg';


class AnnounceWrapper extends React.Component {
    static propTypes = {
        getAnnouncements: PropTypes.func.isRequired,
        isFetching: PropTypes.bool,
        announcements: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            id: PropTypes.number
        })),
        error: PropTypes.string
    }

    componentWillMount () {
        const { getAnnouncements } = this.props;
        getAnnouncements && getAnnouncements();
    }

    render () {
        const { isFetching, announcements, error } = this.props;
        if (error) return null;

        return (
            <Card className="card-small card-home-widget" title="公告">
                { (isFetching || !announcements) 
                    ? <LoadingDots />
                    : <Announce 
                        items={announcements}
                    />
                }
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const announceState = state.getIn(['bbsIndex', 'announce']);
    if (!announceState) return {};

    return {
        isFetching: announceState.get('isFetching'),
        announcements: announceState.get('announcements'),
        error: announceState.get('error')
    };
};
const mapDispatchToProps = dispatch => ({
    getAnnouncements: () => dispatch(getAnnouncements())
});
AnnounceWrapper = connect(mapStateToProps, mapDispatchToProps)(toJS(AnnounceWrapper));


const AppQRCode = () => {
    return (
        <Card className="card-small card-home-widget" title="">
            <img 
                className="mobile-qrcode pull-left" 
                src={mobileQRCode} 
                alt="Mobile QRcode" 
            />
            <h4 className="qrcode-title">下载客户端</h4>
            <p className="qrcode-desc">结识天大人，畅仪天下事</p>
        </Card>
    );
};

const WeiboFollowing = () => {
    return (
        <Card className="card-small card-home-widget" title="新浪微博">
            <img className="pull-left weibo-avatar" src={weiboAvatar} alt="weibo Avatar" />
            <div className="weibo-wrapper">
                <p><a href="https://weibo.com/tjubbs" target="_blank">@天大求实BBS</a></p>
                <a href="https://weibo.com/tjubbs" target="_blank">
                    <Label className="weibo-label">+关注</Label>
                </a>
            </div>
        </Card>
    );
};

class CarouselAdWrapper extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool,
        adList: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            img: PropTypes.number,
            src: PropTypes.string
        })),
        error: PropTypes.string,
        getAds: PropTypes.func.isRequired
    }

    componentWillMount () {
        const { getAds } = this.props;
        getAds && getAds();
    }

    render () {
        const { isFetching, adList, error } = this.props;
        if (isFetching || !adList || !adList.length || error) return null;

        return (
            <CarouselAd 
                adList={adList}
            />
        );
    }
}

const mapCarouselStateToProps = state => {
    const carsouelState = state.getIn(['bbsIndex', 'ads']);
    if (!carsouelState) return {};

    return {
        isFetching: carsouelState.get('isFetching'),
        adList: carsouelState.get('adList'),
        error: carsouelState.get('error')
    };
};
const mapCarouselDispatchToProps = dispatch => ({
    getAds: () => dispatch(getAdsIfNeeded())
});
CarouselAdWrapper = connect(
    mapCarouselStateToProps, 
    mapCarouselDispatchToProps
)(toJS(CarouselAdWrapper));


class IndexRankWrapper extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool,
        rankData: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                pointInc: PropTypes.number
            }))
        ])),
        error: PropTypes.string,
        getIndexRank: PropTypes.func.isRequired
    }

    componentWillMount () {
        const { getIndexRank } = this.props;
        getIndexRank && getIndexRank();
    }

    render () {
        const { isFetching, rankData, error } = this.props;
        if (!rankData || error) return null;

        return (
            <Card 
                className="card-small card-home-widget card-index-rank" 
                title="本周积分排名"
            >
                { isFetching
                    ? <LoadingDots />
                    : <IndexRank 
                        rankData={rankData}
                    />
                }
            </Card>
        );
    }
}

const mapRankStateToProps = state => {
    const indexRankState = state.getIn(['bbsIndex', 'rank']);
    if (!indexRankState) return {};

    return {
        isFetching: indexRankState.get('isFetching'),
        rankData: indexRankState.get('rankData'),
        error: indexRankState.get('error')
    };
};
const mapRankDispatchToProps = dispatch => ({
    getIndexRank: () => dispatch(getIndexRankIfNeeded())
});
IndexRankWrapper = connect(
    mapRankStateToProps, 
    mapRankDispatchToProps
)(toJS(IndexRankWrapper));

export { AnnounceWrapper, AppQRCode, WeiboFollowing, CarouselAdWrapper, IndexRankWrapper };