import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './Timer.css';


function TimerWithHooks({ secs, onSetDeadLine }) {
    let interval = 0;

    const onPlay = () => {
        if (interval) return;
        interval = setInterval(() => {
            let newSecs = secs - 1;
            if (newSecs === -1) {
                newSecs = 0;
                clearInterval(interval);
                interval = null;
            }
            onSetDeadLine(newSecs);
        }, 1000);
    };

    const onPause = () => {
        if (!interval) return;
        clearInterval(interval);
        interval = null;
    };

    useEffect(() => {
        onPause();
    });

    const formatTime = (seconds) => {
        const secondsPart = seconds % 60;
        const minutesPart = (seconds - secondsPart) / 60;
        return `${String(minutesPart).padStart(2, '0')}:${String(secondsPart).padStart(2, '0')}`;
    };

    return (
        <span className="description">
            <button type="button" className="icon icon-play" aria-label="Start Timer" onClick={onPlay} />
            <button type="button" className="icon icon-pause" aria-label="Pause Timer" onClick={onPause} />
            <span className="label-time">{formatTime(secs)}</span>
        </span>
    );
}

TimerWithHooks.propTypes = {
    secs: PropTypes.number.isRequired,
    onSetDeadLine: PropTypes.func.isRequired
};

export default TimerWithHooks;