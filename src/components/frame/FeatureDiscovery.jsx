import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/frame/tap.less';


class FeatureDiscovery extends React.Component {
    static PropTypes = {
        onUnmountTap: PropTypes.func.isRequired
    }

    constructor () {
        super();
        this.state = {
            tapIsOpen: false
        };

        this.handleClickCloseButton = this.handleClickCloseButton.bind(this);
    }

    componentDidMount () {
        // for animation
        setTimeout(() => {
            this.setState({
                tapIsOpen: true
            });
        }, 200);
    }

    componentWillUnmount () {
        clearTimeout(this.timer);
    }

    handleClickCloseButton () {
        const { onUnmountTap } = this.props;
        this.setState({
            tapIsOpen: false
        });
        // spare some time for animation before unmount
        this.timer = setTimeout(() => {
            onUnmountTap && onUnmountTap();
        }, 800);
    }

    render () {
        const { tapIsOpen } = this.state;
        return (
            <div className={`tap-wrapper${tapIsOpen ? ' active' : ''}`}>
                <button 
                    className="close-button"
                    onClick={this.handleClickCloseButton}
                >
                    <i className="iconfont icon-close"></i>
                </button>
                <div className="content">
                    <h1>What's new ?</h1>
                    <section className="version">
                        <h3>alpha 0.4.0</h3>
                        <ul>
                            <li>header会动态响应帖子标题</li>
                            <li>加入了错误处理</li>
                            <li>加入了更新信息</li>
                        </ul>
                    </section>
                    <section className="version">
                        <h3>alpha 0.3.1</h3>
                        <ul>
                            <li>修复了一些微小的bug</li>
                        </ul>
                    </section>
                    <section className="version">
                        <h3>alpha 0.3.0</h3>
                        <ul>
                            <li>修复bug</li>
                            <li>加入mention功能</li>
                        </ul>
                    </section>
                    <footer>
                        * Refer to&nbsp;
                        <a 
                            href="https://git.twtstudio.com/weixinming/bbs-fed-redux"
                            target="_blank"
                        >
                            the repo page
                        </a> 
                        &nbsp;for details</footer>
                </div>
            </div>
        );
    }
};

export default FeatureDiscovery;