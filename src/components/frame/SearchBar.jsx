import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/frame/search.less';


class SearchBar extends React.Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        onFocus: PropTypes.func.isRequired,
        isBlur: PropTypes.func.isRequired
    }

    constructor () {
        super();
        this.state = {
            content: ''
        };

        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleClickIcon = this.handleClickIcon.bind(this);
    }

    handleClickIcon () {
        this.input.focus();
    }

    handleFocus () {
        this.props.onFocus && this.props.onFocus();   
    }

    handleBlur () {
        this.props.onBlur && this.props.onBlur();
    }

    handleChange (e) {
        const content = e.target.value;
        this.setState({
            content
        });
        this.props.onChange && this.props.onChange(content);
    }

    render () {
        const { content } = this.state;
        const { isFocus } = this.props;
        return (
            <div className="search-bar">
                <i 
                    className="iconfont icon-search"
                    onClick={this.handleClickIcon}     
                />
                <input
                    value={content}
                    style={{ width: `${isFocus ? '156px' : '0'}` }}
                    ref={input => this.input = input}
                    placeholder="搜索用户或帖子..."
                    className={`search-input${isFocus ? ' active' : ''}`}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

export default SearchBar;