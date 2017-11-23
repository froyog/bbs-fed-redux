import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../common/Card';
import { Button, ProgressBar } from 'react-bootstrap';
import medalVector from '../../assests/medal.jpg';

import '../../styles/profile/widgets.less';


export class Title extends React.Component {
    constructor () {
        super();
        this.state = {
            isShowDetails: true
        };

        this.handleClickShowMore = this.handleClickShowMore.bind(this);
    }

    handleClickShowMore () {
        this.setState({
            isShowDetails: true
        });
    }

    render () {
        const { isShowDetails } = this.state;

        return (
            <Card title="当前称号" className="card-small">
                <div className="title-wrapper">
                    <h1 className="display-1">开国大佬</h1>
                    <p className="helper text-muted">距离下一称号还有<strong>1300</strong>积分</p>
                    <p className="helper text-muted">相当于水贴<strong>365</strong>条</p>
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
                        <div className="clearfix">
                            <span className="pull-left text-muted">长老级</span>
                            <span className="pull-right text-muted">开国元老</span>
                        </div>
                        <ProgressBar 
                            now={64} 
                            label="13784/20000" 
                            bsStyle="warning"
                            striped
                        />
                    </div>
                    <div className="clearfix">
                        <div className="statistic-wrapper pull-left">
                            <p>158</p>
                            <p className="text-muted">发表主题贴</p>
                        </div>
                        <div className="statistic-wrapper pull-left">
                            <p>1337</p>
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
    
}