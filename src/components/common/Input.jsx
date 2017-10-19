import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './Card';
import '../../styles/common/input.less';

const labelDefaultStyle = {
    transform: 'scale(1) translate(0, 0)',
    color: 'rgba(0, 0, 0, .5)'
};
const selectLabelDefaultStyle = {
    transform: 'scale(.75) translate(0, -28px)',
    color: 'rgba(0, 0, 0, .5)'
}
const labelFocusedStyle = {
    transform: 'scale(.75) translate(0, -28px)',
    color: '#2565ac'
};

export class InputField extends React.PureComponent {
    static propTypes = {
        text: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        type: PropTypes.string,
        fullWidth: PropTypes.bool,
        color: PropTypes.string
    };

    static defaultProps = {
        type: 'text',
        fullWidth: false,
        color: '#2565ac'
    };

    constructor () {
        super();
        this.state = {
            focused: false,
            hasContent: false
        };

        this.handleInputFocused = this.handleInputFocused.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputFocused () {
        this.setState({
            focused: true
        });
    }

    handleInputBlur () {
        if (this.state.hasContent) {
            return;
        }
        this.setState({
            focused: false
        });
    }

    handleInputChange ({ target }) {
        const { onChange } = this.props;
        if (onChange) onChange({ target });
        
        if (target.value.length === 0) {
            this.setState({
                hasContent: false
            });
            return;
        }
        this.setState({
            hasContent: true
        });
    }

    render () {
        const { id, text, type, placeholder, fullWidth } = this.props;
        const { focused, hasContent } = this.state;

        return (
            <div className="input-wrapper" style={{ width: `${fullWidth ? '100%' : '256px'}` }}>
                <label
                    htmlFor={id}
                    style={focused ? labelFocusedStyle : labelDefaultStyle}
                >
                    {text}
                </label>
                { placeholder && !hasContent &&
                    <div
                        className="placeholder"
                        style={{
                            opacity: `${focused ? '1' : '0'}`,
                            [focused ? 'zIndex' : null]: '2'
                        }}
                    >
                        {placeholder}
                    </div>
                }
                <input
                    type={type}
                    id={id}
                    onFocus={this.handleInputFocused}
                    onBlur={this.handleInputBlur}
                    onChange={this.handleInputChange}/>
                <div>
                    <hr aria-hidden="true" className="border-muted" />
                    <hr
                        style={{
                            transform: `scaleX(${focused ? '1' : '0'})`
                        }}
                        aria-hidden="true"
                        className="border-colored" />
                </div>
            </div>
        );
    }
}

export class SelectField extends React.PureComponent {
    static propTypes = {
        labelText: PropTypes.string.isRequired,
        onSelect: PropTypes.func.isRequired,
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
        const { id, innerText } = e.target;
        this.props.onSelect && this.props.onSelect(id);
        this.setState({
            selectedValue: innerText
        });
    }

    render () {
        const { id, labelText, fullWidth, options } = this.props;
        const { focused, selectedValue } = this.state;
        let optionItem;
        if (options) {
            optionItem = options.map(option => 
                <li 
                    onMouseDown={this.handleSelect}
                    id={option.id}
                    key={option.id}
                >
                    {option.name}
                </li>
            );
        }

        return (
            <div className="input-wrapper select" style={{ width: `${fullWidth ? '100%' : '256px'}` }}>
                <label
                    htmlFor={id}
                    style={focused ? labelFocusedStyle : selectLabelDefaultStyle}
                >
                    {labelText}
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