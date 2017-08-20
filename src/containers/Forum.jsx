import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ForumList from './forum/ForumList';
import Board from './forum/Board';


const Forum = () =>
    <Switch>
        <Route exact path='/forum' component={ForumList} />
        <Route path='/forum/:bid' component={Board} />
    </Switch>

export default Forum;
