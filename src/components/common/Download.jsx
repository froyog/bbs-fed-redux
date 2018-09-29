import React from 'react';
import PropTypes from 'prop-types';
import { Media, Button } from 'react-bootstrap';
import icon from '../../assests/icon.jpg';
import '../../styles/common/download.less';

class Download extends React.Component {
    static propTypes = {
        android: PropTypes.shape({
            version: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
        }).isRequired,
        ios: PropTypes.shape({
            version: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
        }).isRequired,
    };

    constructor() {
        super();
        const userAgent = navigator.userAgent;
        this.state = {
            isAndroid: Boolean(userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1),
            isiOS: Boolean(userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)),
        };
    }

    render() {
        const { isAndroid, isiOS } = this.state;
        const { android, ios } = this.props;
        let renderDownload;
        if (isiOS && !isAndroid) {
            renderDownload = (
                <div>
                    <p className="average-rate">
                        <i className="iconfont icon-star" />
                        <i className="iconfont icon-star" />
                        <i className="iconfont icon-star" />
                        <i className="iconfont icon-star" />
                        <i className="iconfont icon-star" />
                        <span className="rate">4.8</span>
                    </p>
                    <Button className="button-outline" href={ios.path} target="_blank">
                        前往 App Store
                    </Button>
                    <p className="version">v{ios.version}</p>
                </div>
            );
        } else if (isAndroid && !isiOS) {
            renderDownload = (
                <div>
                    <Button bsStyle="primary" className="raised button-now" href={android.path}>
                        立即下载
                    </Button>
                    <p className="version">v{android.version}</p>
                </div>
            );
        } else {
            renderDownload = (
                <Button
                    bsStyle="primary"
                    className="raised button-now"
                    href="https://mobile.twt.edu.cn"
                >
                    下载求实BBS App
                </Button>
            );
        }
        return (
            <div id="download">
                <div className="content">
                    <Media>
                        <Media.Left>
                            <img
                                src={icon}
                                className="icon"
                                style={{
                                    borderRadius: isiOS ? '22.5%' : '10px',
                                }}
                            />
                        </Media.Left>
                        <Media.Body>
                            <h2 className="title">求实BBS</h2>
                            <p className="desc">结识天大人，畅议天下事</p>
                            {renderDownload}
                        </Media.Body>
                    </Media>
                </div>
            </div>
        );
    }
}

export default Download;
