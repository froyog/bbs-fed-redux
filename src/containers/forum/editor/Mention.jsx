import React from 'react';
import PropTypes from 'prop-types';

export class Mention {
    getMentionComponent = () => {
        const MentionComponent = ({ entityKey, children, contentState }) => {
            const { url, value } = contentState.getEntity(entityKey).getData();
            return (
                <a href={url || value} className="rdw-mention-link">
                    {children}
                </a>
            );
        };
        MentionComponent.propTypes = {
            entityKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            children: PropTypes.array,
            contentState: PropTypes.object,
        };
        return MentionComponent;
    };
    getMentionDecorator = () => ({
        strategy: this.findMentionEntities,
        component: this.getMentionComponent(),
    });
}

Mention.prototype.findMentionEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(character => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'MENTION';
    }, callback);
};
