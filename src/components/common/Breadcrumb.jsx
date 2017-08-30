import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from './Card';

import '../../styles/common/breadcrumb.less';


export const Breadcrumb = ({ children }) =>
    <Card className="card-breadcrumb">
        {children}
    </Card>;


export const BreadcrumbItem = ({ to, className, children, active, ...restProps }) =>
    <Link
        className={active ? 'breadcrumb active' : 'breadcrumb'}
        to={to}
        {...restProps}
    >
        {children}
    </Link>;
BreadcrumbItem.propTypes = {
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    active: PropTypes.bool
};
