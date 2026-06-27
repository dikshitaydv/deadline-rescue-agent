export default function RescuePlanModal({ plan, loading, error, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal rescue-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon" style={{ background: '#F59E0B' }}>
              <span style={{ fontSize: '16px' }}>🚨</span>
            </div>
            <h2 className="modal-title">Your Rescue Plan</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9BA3AF" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="modal-form">
          {/* Loading */}
          {loading && (
            <div className="rescue-loading">
              <div className="rescue-spinner" />
              <p>AI is analyzing your tasks and building a rescue plan...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rescue-error">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Plan */}
          {plan && !loading && (
            <>
              {/* At-risk summary */}
              {plan.atRisk?.length > 0 && (
                <div className="rescue-atrisk">
                  <h4>⚠️ Tasks At Risk</h4>
                  {plan.atRisk.map((t) => (
                    <div key={t.id} className="rescue-atrisk-item">
                      <span className="rescue-atrisk-name">{t.name}</span>
                      <span className="rescue-atrisk-reason">{t.reason}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Priority ranking */}
              {plan.prioritized?.length > 0 && (
                <div className="rescue-priority">
                  <h4>📊 Priority Order</h4>
                  {plan.prioritized.map((t, i) => (
                    <div key={t.id} className="rescue-priority-item">
                      <span className="rescue-rank">#{i + 1}</span>
                      <div>
                        <p className="rescue-priority-name">{t.name}</p>
                        <p className="rescue-priority-reason">{t.reason}</p>
                      </div>
                      <span className="rescue-score">{t.urgencyScore}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Rescue plan steps */}
              {plan.rescuePlan && (
                <div className="rescue-steps-section">
                  <h4>🎯 Start Here: {plan.rescuePlan.taskName}</h4>
                  <p className="rescue-summary">{plan.rescuePlan.summary}</p>
                  <p className="rescue-time">⏱ {plan.rescuePlan.timeEstimate}</p>
                  <div className="rescue-steps">
                    {plan.rescuePlan.steps.map((step, i) => (
                      <div key={i} className="rescue-step">
                        <div className="rescue-step-num">{i + 1}</div>
                        <p className="rescue-step-text">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}