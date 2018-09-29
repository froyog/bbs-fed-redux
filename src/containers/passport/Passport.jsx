import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route, Redirect, NavLink, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Appeal from './Appeal';
import { ForgetAuthWrapper as ForgetAuth, ForgetResetWrapper as ForgetReset } from './Forget';
import { OldLoginWrapper as OldLogin, OldRegisterWrapper as OldRegister } from './Old';

import '../../styles/passport/passport.less';

const Passport = () => {
    return (
        <div id="passport">
            <div className="card-passport">
                <div className="back-to-home-wrapper">
                    <Link to="/">返回主页</Link>
                </div>
                <div className="switch-links">
                    <NavLink className="pull-left" activeClassName="active" to="/passport/login">
                        登录
                    </NavLink>
                    <NavLink className="pull-left" activeClassName="active" to="/passport/register">
                        注册
                    </NavLink>
                </div>
                <div className="wrapper">
                    <Switch>
                        <Route path="/passport/login" component={Login} />
                        <Route path="/passport/register" component={Register} />
                        <Route path="/passport/appeal" component={Appeal} />
                        <Route path="/passport/forget/auth" component={ForgetAuth} />
                        <Route path="/passport/forget/reset" component={ForgetReset} />
                        <Route path="/passport/old/login" component={OldLogin} />
                        <Route path="/passport/old/register" component={OldRegister} />
                        <Redirect exact from="/passport" to="/passport/login" />
                        <Redirect exact from="/passport/forget" to="/passport/forget/auth" />
                        <Redirect exact from="/passport/old" to="/passport/old/login" />
                    </Switch>
                </div>
            </div>
        </div>
    );
};

Passport.propTypes = {};
export default Passport;
