import 'css/timer.css';
import useProgress from 'hooks/useProgress';

function Timer() {
  const progress = useProgress();
  const color = progress < 50 ? '#22c55e' : progress < 75 ? '#eab308' : '#CC0000';
  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${progress}%`, backgroundColor: color }}
      />
    </div>
  );
}

export default Timer;
