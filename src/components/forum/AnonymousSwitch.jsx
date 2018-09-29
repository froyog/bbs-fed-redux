import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/common/switch.less';

class AnonymousSwitch extends React.Component {
    static propTypes = {
        onToggle: PropTypes.func.isRequired,
        initialState: PropTypes.bool,
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            active: props.initialState,
        };

        this.handleClickSwitch = this.handleClickSwitch.bind(this);
    }

    handleClickSwitch() {
        this.setState({
            active: !this.state.active,
        });
        this.props.onToggle(!this.state.active);
    }

    render() {
        const { active } = this.state;
        const { className } = this.props;
        return (
            <div
                className={`clearfix${className ? ' ' + className : ''} pull-left`}
                onClick={this.handleClickSwitch}
            >
                <div className={`material-switch pull-left${active ? ' enabled' : ''}`}>
                    <div className="guide" />
                    <div className="toggle" />
                </div>
                <span className={`anonymous-text${active ? ' active' : ''}`}>
                    {active ? '匿名发帖已打开' : '匿名发帖已关闭'}
                </span>
            </div>
        );
    }
}

export default AnonymousSwitch;
