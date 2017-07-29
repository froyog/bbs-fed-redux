import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './frame/Header';
import Sidebar from './frame/Sidebar';
import Forums from './ForumList';
import Home from './Home';
import Me from './Me';
import NoMatch from '../components/NoMatch';

import '../styles/app.less';

class App extends React.Component {
    constructor () {
        super();
        this.state = {
            sidebarOpen: true
        };

        this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    }

    handleToggleSidebar () {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        });
    }

    render () {
        const { sidebarOpen } = this.state;
        const mainStyle = {
            'left': `${sidebarOpen ? '200px' : '0'}`
        };

        return (
            <div>
                <Header onToggleMenu={this.handleToggleSidebar}/>
                <Sidebar open={sidebarOpen}/>
                <div id="main" style={mainStyle}>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/forums' component={Forums} />
                        <Route path='/user/me' component={Me} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App;
