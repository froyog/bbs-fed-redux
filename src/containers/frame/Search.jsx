import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../../components/frame/SearchBar';
import { searchUser } from '../../actions/common/search';
import { connect } from 'react-redux';
import { toJS } from '../../util';
import SearchOverlay from '../../components/frame/SearchOverlay';

class Search extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool,
        result: PropTypes.array,
        error: PropTypes.string,
    }

    constructor () {
        super();
        this.state = {
            keyword: '',
            isFocus: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    componentWillUnmount () {
        clearTimeout(this.timeout);
    }

    handleBlur () {
        this.timeout = setTimeout(() => {
            this.setState({
                isFocus: false
            });
        }, 500);
    }

    handleFocus () {
        this.setState({
            isFocus: true
        });
    }

    handleChange (keyword) {
        this.setState({
            keyword
        });
        if (keyword) {
            this.props.searchUser(keyword);
        }
    }

    render () {
        const { isFetching, result, error } = this.props;
        const { keyword, isFocus } = this.state;
        console.log(isFocus)
        
        return (
            <div>
                <SearchBar 
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    isFocus={isFocus}
                />
                {
                    isFocus && keyword &&
                    <SearchOverlay 
                        searchItem={keyword}
                        users={result}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    const searchUser = state.get('searchUser');
    if (!searchUser) return {};

    return {
        isFetching: searchUser.get('isFetching'),
        result: searchUser.get('result'),
        error: searchUser.get('error')
    };
};
const mapDispatchToProps = dispatch => ({
    searchUser: keyword => dispatch(searchUser(keyword))
});
Search = connect(mapStateToProps, mapDispatchToProps)(toJS(Search));
export default Search;