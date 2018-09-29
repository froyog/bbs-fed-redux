import React from 'react';
import { FetchingOverlay } from '../../components/common/Loading';
import { ErrorOverlay } from '../../components/common/ErrorModal';
import Download from '../../components/common/Download';

class DownloadWrapper extends React.Component {
    constructor() {
        super();
        this.state = {
            isFetching: true,
            appData: false,
            error: 0,
        };
    }

    componentDidMount() {
        this.setState({
            isFetching: true,
        });
        fetch('https://mobile-api.twtstudio.com/api/app/info')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    isFetching: false,
                    appData: data.data[0], // bbs
                    error: !data.success,
                });
            });
    }

    render() {
        const { isFetching, appData, error } = this.state;
        if (isFetching) {
            return <FetchingOverlay fullpage />;
        }
        if (error) {
            return <ErrorOverlay reason="数据获取失败" />;
        }
        const android = appData.logs.android[0];
        const ios = appData.logs.ios[0];
        return <Download android={android} ios={ios} />;
    }
}

export default DownloadWrapper;
