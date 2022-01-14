import React from 'react';
import 'css/timer.css';
import useProgress from 'hooks/useProgress';

const Timer = () => {
    const progress = useProgress();
    return (
        <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
    );
}

export default Timer;