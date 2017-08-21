import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import BoardWrapper from './BoardWrapper';
import ForumList from './ForumList';


const Forum = ({ match }) =>
    <Switch>
        <Route exact path={`${match.url}`} component={ForumList} />
        <Route path={`${match.url}/board/:bid`} component={BoardWrapper} />
    </Switch>

export default Forum;
