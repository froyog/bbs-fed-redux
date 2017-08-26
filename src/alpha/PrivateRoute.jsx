import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { toJS } from '../util';


let PrivateRoute = ({ component: Component, auth, ...restProps }) =>
    <Route {...restProps} render={props =>
        auth.isAuthenticated
            ? <Component {...props} />
            : <Redirect to='/welcome' />}
    />;

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
    component: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        auth: state.get('auth')
    };
};
PrivateRoute = connect(mapStateToProps)(toJS(PrivateRoute));

export default PrivateRoute;
