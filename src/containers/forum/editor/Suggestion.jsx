import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../components/common/Avatar';
import { addMention } from './addMention';
import { toJS } from '../../../util';
import { connect } from 'react-redux';
import { searchUser } from '../../../actions/common/search';


export class Suggestion {
    constructor (getEditorState, onChange) {
        this.getEditorState = getEditorState;
        this.onChange = onChange;
    }
  
    findSuggestionEntities = (contentBlock, callback) => {
        if (this.getEditorState()) {
            const selection = this.getEditorState().getSelection();
            if (selection.get('anchorKey') === contentBlock.get('key') &&
                selection.get('anchorKey') === selection.get('focusKey')) {
                
                let text = contentBlock.getText();
                text = text.substr(
                    0,
                    selection.get('focusOffset') === text.length - 1
                        ? text.length
                        : selection.get('focusOffset') + 1,
                );
                let index = text.lastIndexOf('@');
                if ((index === undefined || index < 0) && text[0] === '@') {
                    index = 0;
                }
                if (index >= 0) {
                    callback(index === 0 ? 0 : index, text.length);
                }
            }
        }
    }
  
    getSuggestionComponent = getSuggestionComponent.bind(this);
  
    getSuggestionDecorator = () => ({
        strategy: this.findSuggestionEntities,
        component: this.getSuggestionComponent(),
    });
}

function getSuggestionComponent () {
    const getEditorState = this.getEditorState;
    const onChange = this.onChange;
    class SuggestionComponent extends React.Component {
        static propTypes = {
            children: PropTypes.array,
        };

        constructor () {
            super();
            this.state = {
                style: { left: 15 },
                showSuggestions: true,
                suggestions: []
            };

            this.handleCloseDropdown = this.handleCloseDropdown.bind(this);
            this.handleAddMention = this.handleAddMention.bind(this);
        }

        // componentDidMount() {
        //     const editorRect = config.getWrapperRef().getBoundingClientRect();
        //     const suggestionRect = this.suggestion.getBoundingClientRect();
        //     const dropdownRect = this.dropdown.getBoundingClientRect();
        //     let left;
        //     let right;
        //     let bottom;
        //     if (editorRect.width < (suggestionRect.left - editorRect.left) + dropdownRect.width) {
        //         right = 15;
        //     } else {
        //         left = 15;
        //     }
        //     if (editorRect.bottom < dropdownRect.bottom) {
        //         bottom = 0;
        //     }
        //     this.setState({ // eslint-disable-line react/no-did-mount-set-state
        //         style: { left, right, bottom },
        //     });
        // }

        componentWillReceiveProps (nextProps) {
            const { children } = nextProps;
            const { children: oldChildren, searchUser } = this.props;
            if (children !== oldChildren) {
                const userKeyword = children[0].props.text.substr(1);
                searchUser(userKeyword);
                this.setState({
                    showSuggestions: true
                });
            }
        }

        handleCloseDropdown () {
            this.setState({
                showSuggestions: false,
            });
        }

        handleAddMention (e) {
            const { result: suggestions } = this.props;
            const editorState = getEditorState();
            const index = e.target.getAttribute('data-index');
            addMention(editorState, onChange, suggestions[index]);
        }

        render () {
            const { children, result: suggestions } = this.props;
            const { showSuggestions, style } = this.state;

            return (
                <span
                    className="rdw-suggestion-wrapper"
                    ref={ suggestion => this.suggestion = suggestion }
                    onClick={this.handleCloseDropdown}
                    aria-haspopup="true"
                    aria-label="rdw-suggestion-popup"
                >
                    <span>{children}</span>
                    {
                        showSuggestions &&
                        <span
                            className="rdw-suggestion-dropdown"
                            contentEditable="false"
                            style={style}
                            ref={ dropdown => this.dropdown = dropdown }
                        >
                            {suggestions.map((suggestion, index) =>
                                (<span
                                    key={index}
                                    onClick={this.handleAddMention}
                                    data-index={index}
                                    className="rdw-suggestion-option"
                                >
                                    <Avatar 
                                        className="avatar"
                                        id={suggestion.id}
                                        name={suggestion.name}
                                    />
                                    {suggestion.name}
                                </span>))}
                        </span>
                    }
                </span>
            );
        }
    };

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
    SuggestionComponent = connect(mapStateToProps, mapDispatchToProps)(toJS(SuggestionComponent));

    return SuggestionComponent;
};