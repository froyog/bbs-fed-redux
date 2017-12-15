import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route, Redirect, NavLink, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Appeal from './Appeal';
import { Card } from '../../components/common/Card';

import '../../styles/passport/passport.less';


const Passport = () => {
    return (
        <div id="passport">
            <div className="pull-left back-to-home-wrapper">
                <Link className="back-to-home" to="/">返回主页</Link>
            </div>
            <div className="pull-right switch-link-wrapper">
                <NavLink className="switch-link" activeClassName="active" to="/passport/login">登录</NavLink>
                <NavLink className="switch-link" activeClassName="active" to="/passport/register">注册</NavLink>
            </div>
            <Card
                className="card-passport"
            >
                <Switch>
                    <Route path="/passport/login" component={Login} />
                    <Route path="/passport/register" component={Register} />
                    <Route path="/passport/appeal" component={Appeal} />
                    <Redirect from="/passport" to="/passport/login" />
                </Switch>
            </Card>
        </div>
    );
};

Passport.propTypes = {

};
export default Passport;
