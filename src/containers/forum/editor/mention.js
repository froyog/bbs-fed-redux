import { Mention } from './Mention.jsx';
import { Suggestion } from './Suggestion.jsx';

export const getDecorator = (getEditorState, onChange) => [
    new Mention().getMentionDecorator(),
    new Suggestion(getEditorState, onChange).getSuggestionDecorator(),
];
