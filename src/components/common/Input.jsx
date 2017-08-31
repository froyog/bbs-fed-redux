import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/common/input.less';

const labelDefaultStyle = {
    transform: 'scale(1) translate(0, 0)',
    color: 'rgba(0, 0, 0, .3)'
};
const labelFocusedStyle = {
    transform: 'scale(.75) translate(0, -28px)',
    color: '#2565ac'
};

class InputField extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
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
        const { id, text, type, placeholder, fullWidth, color } = this.props;
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

export default InputField;
