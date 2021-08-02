import React from 'react';
import PropTypes from 'prop-types';

import './Timer.css';

class Timer extends React.Component {

    componentWillUnmount() {
        this.onPause();
    }

    onPlay = () => {
        if (this.interval) return;
        this.interval = setInterval(() => {
            const { secs, onSetDeadLine } = this.props;
            let newSecs = secs - 1;
            if (newSecs === -1) {
                newSecs = 0;
                clearInterval(this.interval);
                this.interval = null;
            }
            onSetDeadLine(newSecs);
        }, 1000);
    };

    onPause = () => {
        if (!this.interval) return;
        clearInterval(this.interval);
        this.interval = null;
    };

    formatTime = (seconds) => {
        const secondsPart = seconds % 60;
        const minutesPart = (seconds - secondsPart) / 60;
        return `${String(minutesPart).padStart(2, '0')}:${String(secondsPart).padStart(2, '0')}`;
    };

    render() {
        const { secs } = this.props;
        return (<span className="description">
        <button type="button" className="icon icon-play" aria-label="Start Timer" onClick={this.onPlay} />
        <button type="button" className="icon icon-pause" aria-label="Pause Timer" onClick={this.onPause} />
        <span className="label-time">{this.formatTime(secs)}</span>
    </span>);
    }
}

Timer.propTypes = {
    secs: PropTypes.number.isRequired,
    onSetDeadLine: PropTypes.func.isRequired
};

export default Timer;