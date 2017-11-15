// For alpha testing authentication
import React from 'react';
// import PropTypes from 'prop-types';
import WelcomeLogin from './WelcomeLogin';

import './style/alpha.less';


class Welcome extends React.Component {
    constructor () {
        super();
        this.state = {
            countdown: 0
        };
        this.updateCountdown = this.updateCountdown.bind(this);
        this.handleAuthPass = this.handleAuthPass.bind(this);
    }

    componentWillMount() {
        const targetDate = new Date(2017, 11, 18).getTime();
        this.setState({
            targetDate: targetDate,
            countdown: targetDate - Date.now()
        });
        this.timer = setInterval(() => {
            this.updateCountdown();
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    updateCountdown () {
        const dateNow = Date.now();
        this.setState({
            countdown: this.state.targetDate - dateNow
        });
    }

    handleAuthPass () {
        this.props.history.push('/');
    }

    render () {
        const { countdown } = this.state;
        const second = countdown.toString().slice(0, -3);
        const milisecond = countdown.toString().slice(-3, -2);
        return (
            <div id="welcome">
                <h1>求实BBS</h1>
                <h2>抢先体验</h2>
                <p className="version-info">ALPHA 0.4.0</p>
                <h1 className="countdown">
                    {second}.
                    <small>{milisecond}</small>
                </h1>
                <WelcomeLogin onAuthPass={this.handleAuthPass}/>
            </div>
        );
    }
}

export default Welcome;
