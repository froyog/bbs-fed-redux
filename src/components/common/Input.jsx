import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './Card';
import '../../styles/common/input.less';

export class InputField extends React.PureComponent {
    static propTypes = {
        text: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        type: PropTypes.string,
        fullWidth: PropTypes.bool,
        color: PropTypes.string,
        errorMessage: PropTypes.string,
        initialValue: PropTypes.string,
        disabled: PropTypes.bool,
        style: PropTypes.object,
    };

    static defaultProps = {
        type: 'text',
        fullWidth: false,
        color: '#2565ac',
    };

    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            hasContent: !!props.initialValue,
        };

        this.handleInputFocused = this.handleInputFocused.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputFocused() {
        this.setState({
            focused: true,
        });
    }

    handleInputBlur() {
        this.setState({
            focused: false,
        });
    }

    handleInputChange({ target }) {
        const { onChange } = this.props;
        if (onChange) onChange({ target });

        if (target.value.length === 0) {
            this.setState({
                hasContent: false,
            });
            return;
        }
        this.setState({
            hasContent: true,
        });
    }

    render() {
        const {
            id,
            text,
            type,
            placeholder,
            fullWidth,
            errorMessage,
            className,
            initialValue,
            disabled,
            style,
        } = this.props;
        const { focused, hasContent } = this.state;

        let labelStyle = {
            transform: 'scale(1) translate(0, 0)',
            color: 'rgba(0, 0, 0, .5)',
        };
        if (focused) {
            labelStyle.transform = 'scale(.75) translate(0, -28px)';
            labelStyle.color = '#2565ac';
        }
        if (hasContent) {
            labelStyle.transform = 'scale(.75) translate(0, -28px)';
        }
        if (errorMessage) {
            labelStyle.color = '#d32f2f';
        }

        return (
            <div
                className={`input-wrapper${className ? ' ' + className : ''}`}
                style={{ width: `${fullWidth ? '100%' : '256px'}`, ...style }}
            >
                <label htmlFor={id} style={labelStyle}>
                    {text}
                </label>
                {placeholder &&
                    !hasContent && (
                        <div
                            className="placeholder"
                            style={{
                                opacity: `${focused ? '1' : '0'}`,
                                [focused ? 'zIndex' : null]: '2',
                            }}
                        >
                            {placeholder}
                        </div>
                    )}
                <input
                    defaultValue={initialValue}
                    type={type}
                    id={id}
                    onFocus={this.handleInputFocused}
                    onBlur={this.handleInputBlur}
                    onChange={this.handleInputChange}
                    disabled={disabled}
                />
                <div>
                    <hr aria-hidden="true" className="border-muted" />
                    <hr
                        style={{
                            transform: `scaleX(${focused ? '1' : '0'})`,
                            borderBottomColor: `${focused && errorMessage ? '#d32f2f' : '#2565ac'}`,
                        }}
                        aria-hidden="true"
                        className="border-colored"
                    />
                </div>
                {errorMessage && <div className="input-error">{errorMessage}</div>}
            </div>
        );
    }
}

export class SelectField extends React.PureComponent {
    static propTypes = {
        labelText: PropTypes.string.isRequired,
        onSelect: PropTypes.func.isRequired,
        fullWidth: PropTypes.bool,
        color: PropTypes.string,
    };

    static defaultProps = {
        fullWidth: false,
        color: '#2565ac',
    };

    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            hasContent: false,
            selectedValue: props.initialValue || '',
        };

        this.handleInputFocused = this.handleInputFocused.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { options } = this.props;
        const { options: nextOptions } = nextProps;
        if (typeof options === 'undefined' && nextOptions) {
            this.setState({
                selectedValue: '',
            });
        }
    }

    handleInputFocused() {
        this.setState({
            focused: true,
        });
    }

    handleInputBlur() {
        this.setState({
            focused: false,
        });
    }

    handleSelect(e) {
        const { id, innerText } = e.target;
        // eslint-disable-next-line
        this.props.onSelect && this.props.onSelect(id);
        this.setState({
            selectedValue: innerText,
            hasContent: true,
        });
    }

    render() {
        const { id, labelText, fullWidth, options } = this.props;
        const { focused, selectedValue, hasContent } = this.state;
        let optionItem,
            inputDisabled = false;
        if (options && options.length) {
            optionItem = options.map(option => (
                <li onMouseDown={this.handleSelect} id={option.id} key={option.id}>
                    {option.name}
                </li>
            ));
        } else {
            inputDisabled = true;
        }

        let labelStyle = {
            transform: 'scale(.75) translate(0, -28px)',
            color: 'rgba(0, 0, 0, .5)',
        };
        if (focused) {
            labelStyle.transform = 'scale(.75) translate(0, -28px)';
            labelStyle.color = '#2565ac';
        }
        if (hasContent) {
            labelStyle.transform = 'scale(.75) translate(0, -28px)';
        }

        return (
            <div
                className="input-wrapper select"
                style={{ width: `${fullWidth ? '100%' : '256px'}` }}
            >
                <label htmlFor={id} style={labelStyle}>
                    {labelText}
                </label>
                <div>
                    {optionItem && (
                        <Card
                            className="options"
                            style={{ display: `${focused ? 'block' : 'none'}` }}
                        >
                            <ul>{optionItem}</ul>
                        </Card>
                    )}
                    <input
                        type="select"
                        value={selectedValue}
                        className="select-button"
                        onFocus={this.handleInputFocused}
                        onBlur={this.handleInputBlur}
                        disabled={inputDisabled}
                    />
                    <svg className="select-icon" focusable="false" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z" />
                    </svg>
                </div>
                <div>
                    <hr aria-hidden="true" className="border-muted" />
                    <hr
                        style={{
                            transform: `scaleX(${focused ? '1' : '0'})`,
                        }}
                        aria-hidden="true"
                        className="border-colored"
                    />
                </div>
            </div>
        );
    }
}
