import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './frame/Header';
import Sidebar from './frame/Sidebar';
import Forums from './ForumList';
import Home from './Home';
import Me from './Me';
import NoMatch from '../components/NoMatch';
import { connect } from 'react-redux';

import '../styles/app.less';


class App extends React.Component {


    render () {
        const { isOpen } = this.props;
        const mainStyle = {
            'marginLeft': `${isOpen ? '200px' : '0'}`
        };

        return (
            <div>
                <Header />
                <Sidebar />
                <div id="main" style={mainStyle}>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/forums' component={Forums} />
                        <Route path='/user/me' component={Me} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isOpen: state.get('sidebar')
});
App = connect(mapStateToProps)(App);

export default App;
