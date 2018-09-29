import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/common/chip.less';

class Chip extends React.Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        avatar: PropTypes.element,
    };

    constructor() {
        super();
        this.state = {
            chipIsExpand: false,
        };

        this.handleExpandChip = this.handleExpandChip.bind(this);
    }

    handleExpandChip() {
        this.setState({
            chipIsExpand: true,
        });
    }

    render() {
        const { chipIsExpand } = this.state;
        const { avatar, label } = this.props;

        return (
            <div className={`chip${chipIsExpand ? ' active' : ''}`} onClick={this.handleExpandChip}>
                <div className="pull-left avatar">{avatar && avatar}</div>
                <span className="label">{label}</span>
                {chipIsExpand && <span className="icon-group pull-right" />}
            </div>
        );
    }
}

export default Chip;
