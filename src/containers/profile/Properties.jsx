import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { Card } from '../../components/common/Card'; 
import Messages from './Messages';
import Collections from './Collections';
import Publish from './Publish';

import '../../styles/profile/properties.less';

const Properties = () => {
    return (
        <Card>
            <ul className="tabs">
                <li className="tab">
                    <NavLink to="/user/me/messages" activeClassName="active">
                        消息
                    </NavLink>
                </li>
                <li className="tab">
                    <NavLink to="/user/me/collections" activeClassName="active">
                        关注收藏
                    </NavLink>
                </li>
                <li className="tab">
                    <NavLink to="/user/me/publish" activeClassName="active">
                        我的发布
                    </NavLink>
                </li>
            </ul>
            <Switch>
                <Route path='/user/me/messages' component={Messages} />
                <Route path='/user/me/collections' component={Collections} />
                <Route path='/user/me/publish' component={Publish} /> 
            </Switch>
        </Card> 
    );
};

export default Properties;