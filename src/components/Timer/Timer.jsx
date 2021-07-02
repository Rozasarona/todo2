import React from 'react';
import PropTypes from 'prop-types';

import './Timer.css';

class Timer extends React.Component {
    onPlay = () => {
        if (this.interval) return;
        this.interval = setInterval(() => {
            const { mins, secs, onSetDeadLine } = this.props;
            let newSecs = secs !== 0 ? secs - 1 : 59;
            let newMins = newSecs === 59 ? mins - 1 : mins;
            if (newMins === -1) {
                newMins = 0;
                newSecs = 0;
                clearInterval(this.interval);
                this.interval = null;
            }
            onSetDeadLine(newMins, newSecs);
        }, 1000);
    };

    onPause = () => {
        if (!this.interval) return;
        clearInterval(this.interval);
        this.interval = null;
    };

    render() {
        const { mins, secs } = this.props;
        return (<span className="description">
        <button type="button" className="icon icon-play" aria-label="Start Timer" onClick={this.onPlay} />
        <button type="button" className="icon icon-pause" aria-label="Pause Timer" onClick={this.onPause} />
        {` ${mins}:${secs} `}
    </span>);
    }
}

Timer.propTypes = {
    mins: PropTypes.number.isRequired,
    secs: PropTypes.number.isRequired,
    onSetDeadLine: PropTypes.func.isRequired
};

export default Timer;