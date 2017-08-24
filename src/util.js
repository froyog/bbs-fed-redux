export const isEqual = (a, b) => {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
        return false;
    }

    for (let i of aProps) {
        if (a[i] !== b[i]) {
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
