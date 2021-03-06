export const isEqual = (a, b) => {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
        return false;
    }
    for (let i = 0; i < aProps.length; i++) {
        if (a[aProps[i]] !== b[bProps[i]]) {
            return false;
        }
    }

    return true;
};


// Judge the current device type via width
const getDeviceWidth = () => window.innerWidth;
export const isMobile = (breakpointWidth = 768) => {
    const width = getDeviceWidth();
    if (width > breakpointWidth) {
        return false;
    }
    return true;
};

// toJS HOC for immutable
import React from 'react';
import { Iterable } from 'immutable';

export const toJS = WrappedComponent => wrappedComponentProps => {
    const KEY = 0;
    const VALUE = 1;

    const propsJS = Object.entries(
        wrappedComponentProps
    ).reduce((newProps, wrappedComponentProp) => {
        newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(
            wrappedComponentProp[VALUE]
        )
            ? wrappedComponentProp[VALUE].toJS()
            : wrappedComponentProp[VALUE];
        return newProps;
    }, {});

    return <WrappedComponent {...propsJS} />;
};

// compress image to minimize the size
// by zhuyupe
export const dataURItoBlob = dataURI => {
    const byteString = atob(dataURI.split(',')[1]);

    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    const bb = new Blob([ab], { 'type': mimeString });
    return bb;
};

export const compressImage = (file, callback) => {
    let img = new Image();
    img.onload = () => {
        let canvas = document.createElement('canvas');
        let w, h;
        if (img.width > img.height) {
            w = 1280;
            h = w * (img.height / img.width);
        } else {
            h = 1280;
            w = h * (img.width / img.height);
        }

        canvas.width = w;
        canvas.height = h;

        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h);

        let newFile;
        newFile = dataURItoBlob(canvas.toDataURL('image/jpeg'));
        newFile.name = file.name.substr(0, file.name.lastIndexOf('.')) + '.jpg';
        if (callback) callback(file);
    };
    img.src = URL.createObjectURL(file);
};

// get user info from state
export const parseUser = (state) => {
    const user = state.get('user');
    if (!user) {
        return false;
    }

    const uid = user.get('uid');
    const token = user.get('token');
    return `${uid}|${token}`;
};

import { draftToMarkdown as originalDraftToMarkdown } from 'markdown-draft-js';

export const draftToMarkdown = rawObject => originalDraftToMarkdown(rawObject, {
    entityItems: {
        'IMAGE': {
            open: () => {},
            close: entity => `![](${entity.data.src})`
        }
    }
});
// re-export for convenient usage
export { markdownToDraft } from 'markdown-draft-js';

export const customToolbar = {
    options: ['inline', 'blockType', 'list', 'emoji', 'history'],
    inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace']
    },
    list: {
        options: ['unordered', 'ordered']
    },
    image: { alignmentEnabled: false }
};

// accessment
/**
 * Determine whether this user is the author of the thread or post he is viewing.
 * @param {number} authorId - author ID of a thread or post
 * @param {number} selfUid - ID of this user
 * @returns {boolean}
 */
export const isAuthorOf = (authorId, selfUid) => Boolean(authorId === selfUid);

/**
 * Determine whether this user is able to modify or delete a thread or post.
 * @param {object} selfModerate - object consist of boards and forums this user mmoderate
 * @param {number} selfGroup - group of this user
 * @param {number} boardId - current board ID
 * @param {number} forumId - current forum ID
 * @returns {boolean}
 */
export const isModeratorOf = (selfModerate, selfGroup, boardId, forumId) => {
    if (!selfModerate || !selfGroup || !boardId || !forumId) return false;
    if (selfGroup === 2) {
        return true;
    }
    const { 
        board: boardModerateArray, 
        forum: forumModerateArray 
    } = selfModerate;
    if (
        boardModerateArray.indexOf(boardId) !== -1 ||
        forumModerateArray.indexOf(forumId) !== -1
    ) {
        return true;
    }
    return false;
};