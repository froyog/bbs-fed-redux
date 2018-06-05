import React from 'react';
import { withRouter } from 'react-router-dom';
import appIcon from '../../assests/icon.jpg';
import '../../styles/frame/bottom-bar.less';

const PERIOD_NOT_SHOWN = 1209600000; // two weeks!

class BottomBar extends React.Component {
    constructor () {
        super();
        const closeOnDate = localStorage.getItem('closeOnDate');
        this.state = {
            isShow: Boolean(Date.now() - closeOnDate > PERIOD_NOT_SHOWN)
        };
        this.handleCloseBar = this.handleCloseBar.bind(this);
        this.handleOpenApp = this.handleOpenApp.bind(this);
    }

    componentWillUnmount () {
        clearTimeout(this.timeout);
    }

    getUrlSchemeFrom (pathname) {
        const URL_SCHEME_ROOT = 'openTJUBBS://';
        let result;
        if (result = /^\/forum\/thread\/(\d+)\/page/.exec(pathname)) {
            let tid = result[1];
            return `${URL_SCHEME_ROOT}tid=${tid}`;
        } else if (result = /^\/forum\/board\/(\d+)\/page/.exec(pathname)) {
            let bid = result[1];
            return `${URL_SCHEME_ROOT}bid=${bid}`;
        } else if (result = /^\/user\/(\d+)$/.exec(pathname)) {
            console.log(pathname, result);
            let uid = result[1];
            return `${URL_SCHEME_ROOT}uid=${uid}`;
        }
        return URL_SCHEME_ROOT;
    }

    handleCloseBar () {
        this.setState({
            isShow: false
        });
        localStorage.setItem('closeOnDate', Date.now());
    }

    handleOpenApp () {
        const pathname = this.props.location.pathname;
        const urlScheme = this.getUrlSchemeFrom(pathname);
        window.location.href = urlScheme;
        this.timeout = setTimeout(() => {
            window.open('https://mobile.twt.edu.cn/bbs');
        }, 500);
    }

    render () {
        if (this.state.isShow) {
            return (
                <div id="download-bar" className="clearfix">
                    <div className="pull-left download-bar-close">
                        <i className="icon iconfont icon-close"></i>
                        <button onClick={this.handleCloseBar}>close</button>
                    </div>
                    <img src={appIcon} className="pull-left download-bar-icon" alt="App Icon" />
                    <div className="pull-left download-bar-desc">
                        <h3>求实BBS客户端</h3>
                        <p>免费下载官方App</p>
                    </div>
                    <a 
                        className="pull-right download-bar-link"
                        onClick={this.handleOpenApp}
                    >
                        应用内打开
                    </a>
        
                </div>
            );
        }
        return null;
    }
}

export default withRouter(BottomBar);