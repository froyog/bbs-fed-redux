import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../common/Card';
import { ProgressBar } from 'react-bootstrap';
import medalVector from '../../assests/medal.jpg';
import Chip from '../common/Chip';
import Avatar from '../common/Avatar';

import '../../styles/profile/widgets.less';

export class Title extends React.PureComponent {
    static propTypes = {
        cPost: PropTypes.number,
        cThread: PropTypes.number,
        points: PropTypes.number,
    };

    constructor() {
        super();
        this.state = {
            pointsOfCurrentTitle: 0,
            pointsOfNextTitle: 0,
            currentTitle: '',
            nextTitle: '',
            atMaxLevel: false,
        };
    }

    _mapPointsToTitle() {
        const { points } = this.props;
        const TITLE_ARRAY = [
                '新手上路',
                '一般站友',
                '中级站友',
                '高级站友',
                '老站友',
                '长老级',
                '本站元老',
                '开国大佬',
            ],
            POINTS_ARRAY = [0, 100, 500, 1000, 2000, 4000, 8000, 10000];

        let eachTitleIndex = 0,
            currentTitleIndex,
            nextTitleIndex;
        for (eachTitleIndex; eachTitleIndex < POINTS_ARRAY.length; eachTitleIndex++) {
            if (POINTS_ARRAY[eachTitleIndex] < points) {
                currentTitleIndex = eachTitleIndex;
            } else {
                nextTitleIndex = eachTitleIndex;
                break;
            }
        }

        return {
            pointsOfCurrentTitle: POINTS_ARRAY[currentTitleIndex],
            pointsOfNextTitle: POINTS_ARRAY[nextTitleIndex] || 10000,
            currentTitle: TITLE_ARRAY[currentTitleIndex],
            nextTitle: TITLE_ARRAY[nextTitleIndex],
            atMaxLevel: !!(points > POINTS_ARRAY[POINTS_ARRAY.length - 1]),
        };
    }

    render() {
        const { cPost, cThread, points } = this.props;
        const {
            pointsOfCurrentTitle,
            pointsOfNextTitle,
            currentTitle,
            nextTitle,
            atMaxLevel,
        } = this._mapPointsToTitle();

        return (
            <Card title="当前称号" className="card-small">
                <div className="title-wrapper">
                    <h1 className="display-1">{currentTitle}</h1>
                    {atMaxLevel ? (
                        <p className="helper text-muted">已达到最高等级</p>
                    ) : (
                        <div>
                            <p className="helper text-muted">
                                距离下一称号还有
                                <strong>{pointsOfNextTitle - points}</strong>
                                积分
                            </p>
                            <p className="helper text-muted">
                                相当于水贴
                                <strong>{Math.floor((pointsOfNextTitle - points) / 2)}</strong>条
                            </p>
                        </div>
                    )}
                </div>
                <div className="title-details">
                    <div>
                        {atMaxLevel ? null : (
                            <div className="clearfix">
                                <span className="pull-left text-muted">{currentTitle}</span>
                                <span className="pull-right text-muted">{nextTitle}</span>
                            </div>
                        )}
                        <ProgressBar
                            now={
                                atMaxLevel
                                    ? 100
                                    : ((points - pointsOfCurrentTitle) /
                                          (pointsOfNextTitle - pointsOfCurrentTitle)) *
                                      100
                            }
                            label={`${points}/${pointsOfNextTitle}`}
                            bsStyle="warning"
                            striped
                        />
                    </div>
                    <div className="clearfix">
                        <div className="statistic-wrapper pull-left">
                            <p>{cThread}</p>
                            <p className="text-muted">发表主题贴</p>
                        </div>
                        <div className="statistic-wrapper pull-left">
                            <p>{cThread + cPost}</p>
                            <p className="text-muted">总共发帖</p>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export const Medal = () => {
    return (
        <Card title="勋章展示柜" className="card-small">
            <div className="release-soon">
                <p>此功能即将上线</p>
                <p>敬请期待</p>
            </div>

            <div className="medal-wrapper">
                <img src={medalVector} alt="" />
                <p className="name">“自赞先锋”</p>
            </div>
            <div className="medal-wrapper">
                <img src={medalVector} alt="" />
                <p className="name">“自赞先锋”</p>
            </div>
        </Card>
    );
};

export const Friends = () => {
    return (
        <Card title="我的好友" className="card-small">
            <Chip avatar={<Avatar id={18480} />} label="testuser" />
        </Card>
    );
};
