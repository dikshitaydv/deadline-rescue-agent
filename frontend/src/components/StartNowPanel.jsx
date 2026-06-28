import { getQuickStartSteps } from '../utils/riskEngine'

export default function StartNowPanel({ task, onClose }) {
  const steps = getQuickStartSteps(task)

  return (
    <div className="start-now-panel">
      {/* Header */}
      <div className="start-now-header">
        <div className="start-now-title-wrap">
          <span className="start-now-icon">🎯</span>
          <div>
            <p className="start-now-title">Start Now — {task.name}</p>
            <p className="start-now-sub">3 steps to make progress in the next 45 minutes</p>
          </div>
        </div>
        <button className="start-now-close" onClick={onClose} title="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Steps */}
      <div className="start-now-steps">
        {steps.map((step, i) => (
          <div key={i} className="start-now-step">
            <div className="start-now-step-num">{i + 1}</div>
            <p className="start-now-step-text">{step}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="start-now-footer">
        <button className="start-now-done-btn" onClick={onClose}>
          ✓ Got it, starting now
        </button>
      </div>
    </div>
  )
}