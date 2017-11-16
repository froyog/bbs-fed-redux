import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import MyStuff from './MyStuff';
import RecentUpdate from './RecentUpdate';
import Profile from './Profile';
import { connect } from 'react-redux';
import { FetchingOverlay } from '../../components/common/Loading';
import { toJS } from '../../util';


class UserIndex extends React.Component {
    static propTypes = {
        selfUid: PropTypes.number
    }

    constructor () {
        super();
        this.state = {
            uidInString: ''
        };

        this._mapPathToUid = this._mapPathToUid.bind(this);
    }

    componentDidMount () {
        const absolutePath = this.props.location.pathname;
        const relPath = absolutePath.substring(absolutePath.lastIndexOf('/') + 1);
        let mappedUid = this._mapPathToUid(relPath);
        this.setState({
            uidInString: mappedUid
        });
    }

    _mapPathToUid (relPath) {
        if (relPath === 'me') {
            return this.props.selfUid + ''
        }
        return relPath;
    }

    render () {
        const { uidInString } = this.state;
        if (!uidInString) {
            // sopmething bad happend
            return null;
        }

        return (
            <div>
                <Profile uidInString={uidInString} />
                <Switch>
                    <Route exact path="/user/me" component={MyStuff} />
                    <Route path="/user/:uid" component={RecentUpdate} />
                </Switch>
            </div>
    
        )
    }
}

const mapStateToProps = state => {
    const user = state.get('user');
    if (!user || !user.get('uid')) return {}

    return {
        selfUid: user.get('uid')
    };
}
UserIndex = connect(mapStateToProps)(UserIndex);

export default UserIndex;
