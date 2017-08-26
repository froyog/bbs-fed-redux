// For alpha testing authentication
import React from 'react';
import PropTypes from 'prop-types';
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
        const targetDate = new Date(2017, 8, 26).getTime();
        this.setState({
            targetDate: targetDate,
            countdown: targetDate - Date.now()
        });
        this.timer = setInterval(() => {
            this.updateCountdown();
        }, 233);
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
        const milisecond = countdown.toString().slice(-3);
        return (
            <div id="welcome">
                <h1>求实BBS</h1>
                <h2>抢先体验<small>v0.1.5</small></h2>
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
