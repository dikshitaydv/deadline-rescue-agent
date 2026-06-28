/**
 * RescueBanner
 * Appears at the top of the dashboard when any task is At Risk.
 * Dismissable per session.
 */
import { useState } from 'react'

export default function RescueBanner({ atRiskCount, onRescue }) {
  const [dismissed, setDismissed] = useState(false)

  if (atRiskCount === 0 || dismissed) return null

  return (
    <div className="rescue-banner">
      <div className="rescue-banner-left">
        <span className="rescue-banner-icon">🚨</span>
        <div>
          <p className="rescue-banner-title">
            Rescue Mode — {atRiskCount} task{atRiskCount > 1 ? 's are' : ' is'} at risk
          </p>
          <p className="rescue-banner-sub">
            Don't wait — every minute counts. Generate a rescue plan now.
          </p>
        </div>
      </div>
      <div className="rescue-banner-right">
        <button className="rescue-banner-btn" onClick={onRescue}>
          Generate Rescue Plan →
        </button>
        <button className="rescue-banner-close" onClick={() => setDismissed(true)} title="Dismiss">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}