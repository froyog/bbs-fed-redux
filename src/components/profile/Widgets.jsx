import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../common/Card';
import { Button, ProgressBar } from 'react-bootstrap';
import medalVector from '../../assests/medal.jpg';
import Chip from '../common/Chip';
import Avatar from '../common/Avatar';

import '../../styles/profile/widgets.less';


export class Title extends React.PureComponent {
    static propTypes = {
        cPost: PropTypes.number,
        cThread: PropTypes.number,
        points: PropTypes.number
    }

    constructor () {
        super();
        this.state = {
            isShowDetails: true,
            pointsOfCurrentTitle: 0,
            pointsOfNextTitle: 0,
            currentTitle: '',
            nextTitle: '',
            atMaxLevel: false
        };

        this.handleClickShowMore = this.handleClickShowMore.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if (typeof nextProps.points !== 'undefined') {
            const { cPost, cThread, points } = nextProps;
            const TITLE_ARRAY = ['新手上路', '一般站友', '中级站友', '高级站友', '老站友', '长老级', '本站元老', '开国大佬'],
                POINTS_ARRAY = [0, 100, 500, 1000, 2000, 4000, 8000, 10000];
            
            let eachTitleIndex = 0, currentTitleIndex, nextTitleIndex;
            for (eachTitleIndex; eachTitleIndex < POINTS_ARRAY.length; eachTitleIndex++) {
                if (POINTS_ARRAY[eachTitleIndex] < points) {
                    currentTitleIndex = eachTitleIndex;
                } else {
                    nextTitleIndex = eachTitleIndex;
                    break;
                }
            }
    
            this.setState({
                pointsOfCurrentTitle: POINTS_ARRAY[currentTitleIndex],
                pointsOfNextTitle: POINTS_ARRAY[nextTitleIndex] || 10000,
                currentTitle: TITLE_ARRAY[currentTitleIndex],
                nextTitle: TITLE_ARRAY[nextTitleIndex],
                atMaxLevel: typeof nextTitleIndex === 'undefined' ? true : false
            });
        }
    }

    handleClickShowMore () {
        this.setState({
            isShowDetails: true
        });
    }

    render () {
        const { isShowDetails, pointsOfCurrentTitle, pointsOfNextTitle, 
            currentTitle, nextTitle, atMaxLevel } = this.state;
            console.log(atMaxLevel);
        const { cPost, cThread, points } = this.props;

        return (
            <Card title="当前称号" className="card-small">
                <div className="title-wrapper">
                    <h1 className="display-1">{currentTitle}</h1>
                    {
                        atMaxLevel
                            ? <p className="helper text-muted">您已达到最高等级</p>
                            : <div>
                                <p className="helper text-muted">距离下一称号还有<strong>{pointsOfNextTitle - points}</strong>积分</p>
                                <p className="helper text-muted">相当于水贴<strong>{Math.floor((pointsOfNextTitle-points)/2)}</strong>条</p>
                              </div>
                    }
                </div>
                {/* <div className="title-bottom-bar clearfix">
                    <Button 
                        className="flat pull-right" 
                        bsStyle="link"
                        onClick={this.handleClickShowMore}
                    >
                        <svg viewbox="0 0 12 12">
                            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                        </svg>
                    </Button>
                </div> */}
                <div
                    className="title-details"
                    style={{ maxHeight: `${isShowDetails ? '200px' : '0'}` }}
                >
                    <div>
                        {
                            atMaxLevel
                                ? null
                                : <div className="clearfix">
                                    <span className="pull-left text-muted">{currentTitle}</span>
                                    <span className="pull-right text-muted">{nextTitle}</span>
                                  </div>
                        }
                        <ProgressBar 
                            now={ 
                                atMaxLevel
                                    ? 100
                                    : ((points - pointsOfCurrentTitle)/(pointsOfNextTitle - pointsOfCurrentTitle))*100
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
    };
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
            <Chip avatar={<Avatar id="18480" />} label="testuser" />
        </Card>
    );
};