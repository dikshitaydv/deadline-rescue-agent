export default function WelcomeCard({ onAddTask }) {
  return (
    <div className="welcome-card">
      <div className="welcome-text">
        <h1 className="welcome-heading">
          Hi, Arjun! <span className="wave">👋</span>
        </h1>
        <p className="welcome-sub">What are we rescuing today?</p>

        <div className="quick-links">
          <a href="#" className="quick-link quick-link--blue">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            View Calendar
          </a>

          <a href="#" className="quick-link quick-link--yellow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Priority Tasks
          </a>

          <button onClick={onAddTask} className="quick-link quick-link--pink">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            Add New Task
          </button>

          <a href="#" className="quick-link quick-link--green">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            View Progress
          </a>
        </div>
      </div>

      {/* Decorative right side — abstract urgency graphic */}
      <div style={{ flexShrink: 0, marginLeft: 24, opacity: 0.12 }}>
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
          <circle cx="60" cy="50" r="48" stroke="#4F6BFF" strokeWidth="3" strokeDasharray="8 5" />
          <circle cx="60" cy="50" r="32" stroke="#4F6BFF" strokeWidth="2" />
          <circle cx="60" cy="50" r="14" fill="#4F6BFF" />
          <line x1="60" y1="50" x2="60" y2="24" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <line x1="60" y1="50" x2="76" y2="58" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}