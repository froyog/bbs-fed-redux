import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


const Time = ({ timestamp, absolute, ...restProps }) => {
    const pad = val =>
        ('0' + val).substr(-2);

    const relativeTime = date => {
        const now = new Date();

        const diff = date.getTime() - now.getTime();
        const absDiff = Math.abs(diff);
        if (absDiff < 1000) return '刚刚';

        const relation = diff > 0 ? '后' : '前';
        const base = diff > 0
                ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
                : new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if ((diff > 0 && date <= base) || (diff < 0 && date >= base)) {
          // 在同一天
            if (absDiff > 3600000) {
                return `${Math.floor(absDiff / 3600000)} 小时${relation}`;
            } else if (absDiff > 1800000) {
                return `半小时${relation}`;
            } else if (absDiff > 60000) {
                return `${Math.floor(absDiff / 60000)} 分钟${relation}`;
            } else {
                return `${Math.floor(absDiff / 1000)} 秒${relation}`;
            }
        }

        const diffDay = Math.floor(Math.abs((date.getTime() - base.getTime()) / 86400000));
        if (diffDay >= 7) {
            return null;
        }

        if (diffDay === 0) {
            return `${diff > 0 ? '明天' : '昨天'} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
        } else if (diffDay === 1) {
            return `${diff > 0 ? '后天' : '前天'} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
        } else {
            return `${diffDay + 1} 天${relation}`;
        }
    };

    const renderTooltip = timeString =>
        <Tooltip id="full time">{timeString}</Tooltip>;

    const createDate = new Date(timestamp * 1000);
    const year = createDate.getFullYear();
    const month = createDate.getMonth() + 1;
    const day = createDate.getDate();
    const hour = createDate.getHours();
    const minute = createDate.getMinutes();
    const second = createDate.getSeconds();

    let timeString = `${year}/${month}/${day} ${pad(hour)}:${pad(minute)}:${pad(second)}`;
    let relative = relativeTime(createDate);

    if (absolute || !relative) return <span {...restProps}>{timeString}</span>;
    return (
        <OverlayTrigger placement="bottom" overlay={renderTooltip(timeString)}>
            <span {...restProps}>{relativeTime(createDate)}</span>
        </OverlayTrigger>
    );

};

Time.propTypes = {
    timestamp: PropTypes.number.isRequired,
    absolute: PropTypes.bool
};
Time.defaultProps = {
    absolute: false
};

export default Time;
