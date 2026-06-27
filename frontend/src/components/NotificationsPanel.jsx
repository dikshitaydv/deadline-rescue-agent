const STATIC_NOTIFS = [
  {
    id: 1,
    icon: '⚠️',
    bg: '#FFF7ED',
    message: '"Submit assignment" is due in 1 day — start your rescue plan now!',
  },
  {
    id: 2,
    icon: '📋',
    bg: '#EEF2FF',
    message: 'You have 4 active tasks this week. Keep going!',
  },
  {
    id: 3,
    icon: '🎉',
    bg: '#ECFDF5',
    message: 'Great start! Your presentation slides are 45% done.',
  },
]

export default function NotificationsPanel({ tasks, onRescue }) {
  const atRisk = tasks.filter((t) => t.status === 'At Risk')

  return (
    <div className="notif-panel">
      {/* Header */}
      <div className="notif-panel-header">
        <div className="notif-panel-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <h3>Alerts & Nudges</h3>
        </div>
        <a href="#" className="see-all">See all</a>
      </div>

      {/* Dynamic rescue alert */}
      {atRisk.length > 0 && (
        <div className="rescue-alert">
          <div className="rescue-alert-header">
            <span className="rescue-icon">🚨</span>
            <span className="rescue-title">Rescue Mode Active</span>
          </div>
          <p className="rescue-msg">
            {atRisk.length} task{atRisk.length > 1 ? 's are' : ' is'} at risk.
            Let's build a rescue plan!
          </p>
          {/* onRescue will be wired to AI in Day 2 */}
          <button className="btn-rescue" onClick={onRescue}>
            Generate Rescue Plan →
          </button>
        </div>
      )}

      {/* Static notification cards */}
      <div className="notif-list">
        {STATIC_NOTIFS.map((n) => (
          <div key={n.id} className="notif-item">
            <div className="notif-icon-wrap" style={{ background: n.bg }}>
              <span style={{ fontSize: '14px' }}>{n.icon}</span>
            </div>
            <p className="notif-text">{n.message}</p>
            <button className="notif-arrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9BA3AF" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="quick-actions-card">
        <h4 className="quick-actions-title">Quick Actions</h4>
        <div className="quick-actions-list">
          <button className="quick-action-btn"><span>📅</span> Check Calendar</button>
          <button className="quick-action-btn"><span>🎯</span> Set Priority</button>
          <button className="quick-action-btn"><span>📊</span> View Analytics</button>
        </div>
      </div>
    </div>
  )
}