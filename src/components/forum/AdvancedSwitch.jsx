import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import '../../styles/common/switch.less';


class AdvancedSwitch extends React.Component {
    static propTypes = {
        onToggle: PropTypes.func.isRequired,
        initialState: PropTypes.bool,
        className: PropTypes.string
    }

    constructor (props) {
        super(props);
        this.state = {
            active: props.initialState
        };

        this.handleClickSwitch = this.handleClickSwitch.bind(this);
    }

    handleClickSwitch () {
        this.setState({
            active: !this.state.active
        });
        this.props.onToggle(!this.state.active);
    }

    render () {
        const { active } = this.state;
        const { className } = this.props;
        return (
            <div 
                className={`clearfix${className ? ' ' + className : ''}`}
                onClick={this.handleClickSwitch}
            >
                <div className={`material-switch pull-left${active ? ' enabled' : ''}`}>
                    <div className="guide"></div>
                    <div className="toggle"></div>
                </div>
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip className="advanced-help" id="advanced-help">
                            <h5>专为<strong>高级用户</strong>设计</h5>
                            <p>如果您熟悉 Markdown 语法，打开此选项在编辑器中直接书写 Markdown 语法。</p>
                        </Tooltip>
                    }
                >
                    <span className={`anonymous-text`}>
                        高级模式
                    </span>

                </OverlayTrigger>
            </div>
        );
    }
}

export default AdvancedSwitch;