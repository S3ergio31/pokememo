import 'css/timer.css';
import useProgress from 'hooks/useProgress';

function Timer() {
  const progress = useProgress();
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}

export default Timer;
