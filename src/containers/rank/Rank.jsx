import React from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import RankPage from './RankPage';

import { Card } from '../../components/common/Card';

const Rank = () => (
    <Card>
        <ul className="tabs">
            <li className="tab">
                <NavLink to="/rank/week" activeClassName="active">
                    周积分
                </NavLink>
            </li>
            <li className="tab">
                <NavLink to="/rank/month" activeClassName="active">
                    月积分
                </NavLink>
            </li>
        </ul>
        <Switch>
            <Redirect exact from="/rank" to="/rank/week" />
            <Route path="/rank/week" render={props => <RankPage {...props} type="week" />} />
            <Route path="/rank/month" render={props => <RankPage {...props} type="month" />} />
        </Switch>
    </Card>
);

export default Rank;
