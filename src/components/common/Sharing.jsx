import React from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import '../../styles/common/sharing.less';

const Sharing = ({ sites, url, title, source, description, className }) => {
    title = encodeURIComponent(`${title}_天大求实BBS`);
    description = encodeURIComponent(description);
    source = encodeURIComponent(source);

    const templates = {
        qq: `http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${title}&source=${source}&desc=${description}`,
        weibo: `http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${title}`,
        wechat: `javascript:void(0)`,
        douban: `http://shuo.douban.com/!service/share?href=${encodeURIComponent(url)}&name=${title}`
    };

    let sharingButtons = sites.map((site, i) => {
        if (site === 'wechat') {
            return (
                <a key={i} className='icon iconfont icon-wechat' target='_blank' href='javascript:'>
                    <div className="wechat-qrcode">
                        <h4>微信扫一扫：分享</h4>
                        <div className="qrcode">
                            <QRCode value={url} size={100} />
                        </div>
                        <div className="help">
                            <p>微信中扫描二维码</p>
                            <p>将帖子分享至朋友圈</p>
                        </div>
                    </div>
                </a>
            );
        } else {
            let className = `icon iconfont icon-${site}`;
            return <a key={i} className={className} href={templates[site]} target="_blank"></a>;
        }
    });

    return (
        <div className={`share-button ${className}`}>
            {sharingButtons}
        </div>
    );
};

Sharing.propTypes = {
    sites: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    source: PropTypes.string,
    description: PropTypes.string,
    className: PropTypes.string,
};
Sharing.defaultProps = {
    description: '结识天大人，畅仪天下事_天大求实BBS'
};

export default Sharing;
