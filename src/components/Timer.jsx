import React, { useEffect, useState } from 'react';
import 'css/timer.css';

const SECONDS_TO_GAME_OVER = 120;
const PER_SECOND = 1000;
const MAX_PROGRESS = 100;
const ONE_SECOND = 1;

const Timer = () => {
    const [progress, setProgress] = useState(0);
    const [elapseTime, setElapseTime] = useState(0);

    useEffect(
        () => setProgress(elapseTime * MAX_PROGRESS / SECONDS_TO_GAME_OVER), 
        [elapseTime]
    );

    useEffect(() => {
        const incrementElapseTime = () => setElapseTime(actualElapseTime => actualElapseTime + ONE_SECOND);
        const timer = setInterval(incrementElapseTime, PER_SECOND);
        const stop = () => clearInterval(timer);
        progress === MAX_PROGRESS && stop();
        return stop;
    }, [progress]);

    return (
        <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
    );
}

export default Timer;