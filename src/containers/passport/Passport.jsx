import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { Card } from '../../components/common/Card';

import '../../styles/passport/passport.less';


const Passport = () => {
    return (
        <div id="passport">
            <Link to="/passport/login">Login</Link>
            <Link to="/passport/register">Register</Link>
            <Card
                className="card-passport"
            >
                <Switch>
                    <Route path="/passport/login" component={Login} />
                    <Route path="/passport/register" component={Register} />
                    <Redirect from="/passport" to="/passport/login" />
                </Switch>
            </Card>
        </div>
    );
};

Passport.propTypes = {

};
export default Passport;
