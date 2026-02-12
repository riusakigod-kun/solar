import { useSolarSystemStore } from '../store';
import './TimeControls.css';

export function TimeControls() {
  const { isPaused, timeSpeed, togglePause, setTimeSpeed } = useSolarSystemStore();

  const speedPresets = [0.1, 0.5, 1, 2, 5, 10];

  return (
    <div className="time-controls">
      <div className="time-controls-header">
        <div className="control-label">TIME CONTROL</div>
      </div>

      <div className="time-controls-content">
        {/* Pause/Play Button */}
        <button
          className={`control-button ${isPaused ? 'paused' : 'playing'}`}
          onClick={togglePause}
          title={isPaused ? 'Resume' : 'Pause'}
        >
          {isPaused ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          )}
        </button>

        {/* Speed Display */}
        <div className="speed-display">
          <span className="speed-value">{timeSpeed.toFixed(1)}x</span>
          <span className="speed-label">SPEED</span>
        </div>

        {/* Speed Presets */}
        <div className="speed-presets">
          {speedPresets.map((speed) => (
            <button
              key={speed}
              className={`speed-preset ${timeSpeed === speed ? 'active' : ''}`}
              onClick={() => setTimeSpeed(speed)}
            >
              {speed}x
            </button>
          ))}
        </div>

        {/* Fine Control Buttons */}
        <div className="speed-fine-control">
          <button
            className="speed-adjust"
            onClick={() => setTimeSpeed(timeSpeed - 0.5)}
            disabled={timeSpeed <= 0.1}
          >
            −
          </button>
          <button
            className="speed-adjust"
            onClick={() => setTimeSpeed(timeSpeed + 0.5)}
            disabled={timeSpeed >= 10}
          >
            +
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="controls-help">
        <div className="help-item">Click planet for details</div>
        <div className="help-item">Right-click + drag to rotate</div>
        <div className="help-item">Scroll to zoom</div>
      </div>
    </div>
  );
}
