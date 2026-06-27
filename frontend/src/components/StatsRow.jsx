export default function StatsRow({ total, atRisk, completed }) {
  const stats = [
    {
      label: 'Total Tasks',
      value: total,
      sub: 'this session',
      color: '#FF6B9D',
      bg: '#FFF0F6',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B9D" strokeWidth="2">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
      ),
    },
    {
      label: 'At Risk',
      value: atRisk,
      sub: 'need rescue',
      color: '#F59E0B',
      bg: '#FFFBEB',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
    {
      label: 'Completed',
      value: completed,
      sub: 'tasks done',
      color: '#10B981',
      bg: '#ECFDF5',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
    },
    {
      label: 'Avg Deadline',
      value: '2 days',
      sub: 'remaining',
      color: '#4F6BFF',
      bg: '#EEF2FF',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F6BFF" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ]

  return (
    <div className="stats-row">
      {stats.map((s) => (
        <div className="stat-card" key={s.label}>
          <div className="stat-header">
            <div className="stat-icon-wrap" style={{ background: s.bg }}>
              {s.icon}
            </div>
            <button className="stat-menu" title="Options">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9BA3AF" strokeWidth="2">
                <circle cx="12" cy="5"  r="1" fill="#9BA3AF" />
                <circle cx="12" cy="12" r="1" fill="#9BA3AF" />
                <circle cx="12" cy="19" r="1" fill="#9BA3AF" />
              </svg>
            </button>
          </div>
          <p className="stat-label">{s.label}</p>
          <p className="stat-sub">{s.sub}</p>
          <p className="stat-value" style={{ color: s.color }}>{s.value}</p>
        </div>
      ))}
    </div>
  )
}