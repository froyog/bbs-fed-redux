import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './Card';
import '../../styles/common/input.less';

const labelDefaultStyle = {
    transform: 'scale(.75) translate(0, -28px)',
    color: 'rgba(0, 0, 0, .5)'
};
const labelFocusedStyle = {
    transform: 'scale(.75) translate(0, -28px)',
    color: '#2565ac'
};

class SelectField extends React.PureComponent {
    static propTypes = {
        text: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        type: PropTypes.string,
        fullWidth: PropTypes.bool,
        color: PropTypes.string
    };

    static defaultProps = {
        fullWidth: false,
        color: '#2565ac'
    };

    constructor () {
        super();
        this.state = {
            focused: false
        };

        this.handleInputFocused = this.handleInputFocused.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleInputFocused () {
        this.setState({
            focused: true
        });
    }

    handleInputBlur () {
        this.setState({
            focused: false
        });
    }

    handleSelect (e) {
        this.setState({
            selectedValue: e.target.innerText,
        });
    }

    render () {
        const { id, text, placeholder, fullWidth, options } = this.props;
        const { focused, selectedValue } = this.state;
        const optionItem = options.map(option => <li onMouseDown={this.handleSelect}>{option}</li>)

        return (
            <div className="input-wrapper select" style={{ width: `${fullWidth ? '100%' : '256px'}` }}>
                <label
                    htmlFor={id}
                    style={focused ? labelFocusedStyle : labelDefaultStyle}
                >
                    {text}
                </label>
                <div>
                    <Card 
                        className="options"
                        style={{ display: `${focused ? 'block' : 'none'}` }}
                    >
                        <ul>
                            {optionItem}
                        </ul>
                    </Card>
                    <input
                        type="select"
                        value={selectedValue}
                        className="select-button"
                        onFocus={this.handleInputFocused}
                        onBlur={this.handleInputBlur}
                    />
                    <svg className="select-icon" focusable="false" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z"></path>
                    </svg>
                </div>
                <div>
                    <hr aria-hidden="true" className="border-muted" />
                    <hr
                        style={{
                            transform: `scaleX(${focused ? '1' : '0'})`
                        }}
                        aria-hidden="true"
                        className="border-colored"
                    />
                </div>
            </div>
        );
    }
}

export default SelectField;
