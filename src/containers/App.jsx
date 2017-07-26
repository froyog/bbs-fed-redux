import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Forums from './ForumList';
import Home from './Home';
import Me from './Me';
import NoMatch from '../components/NoMatch';


const App = () => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/forums' component={Forums} />
        <Route path='/user/me' component={Me} />
        <Route component={NoMatch} />
    </Switch>
);

export default App;
