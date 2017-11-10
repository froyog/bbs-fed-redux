import {
    EditorState,
    Modifier,
} from 'draft-js';
import { getSelectedBlock } from 'draftjs-utils';

export const addMention = (
    editorState,
    onChange,
    suggestion,
) => {
    const { id, name } = suggestion;
    const url = `/user/${id}`;
    const entityKey = editorState
        .getCurrentContent()
        .createEntity('MENTION', 'IMMUTABLE', { text: `@${name}`, name, url })
        .getLastCreatedEntityKey();
    const selectedBlock = getSelectedBlock(editorState);
    const selectedBlockText = selectedBlock.getText();
    const mentionIndex = (selectedBlockText.lastIndexOf(' @') || 0) + 1;
    let focusOffset;
    let spaceAlreadyPresent = false;
    if (selectedBlockText.length === mentionIndex + 1) {
        focusOffset = selectedBlockText.length;
    } else {
        focusOffset = editorState.getSelection().focusOffset;
    }
    if (selectedBlockText[focusOffset] === ' ') {
        spaceAlreadyPresent = true;
    }
    let updatedSelection = editorState.getSelection().merge({
        anchorOffset: mentionIndex,
        focusOffset,
    });
    let newEditorState = EditorState.acceptSelection(editorState, updatedSelection);
    let contentState = Modifier.replaceText(
        newEditorState.getCurrentContent(),
        updatedSelection,
        `@${name}`,
        newEditorState.getCurrentInlineStyle(),
        entityKey,
    );
    newEditorState = EditorState.push(newEditorState, contentState, 'insert-characters');

    if (!spaceAlreadyPresent) {
    // insert a blank space after mention
        updatedSelection = newEditorState.getSelection().merge({
            anchorOffset: mentionIndex + name.length + 1,
            focusOffset: mentionIndex + name.length + 1,
        });
        newEditorState = EditorState.acceptSelection(newEditorState, updatedSelection);
        contentState = Modifier.insertText(
            newEditorState.getCurrentContent(),
            updatedSelection,
            ' ',
            newEditorState.getCurrentInlineStyle(),
            undefined,
        );
    }
    onChange(EditorState.push(newEditorState, contentState, 'insert-characters'));
};