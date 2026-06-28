import { EFFORT_COLORS, STATUS_CONFIG, getDaysLeft, getProgressColor } from '../utils/taskHelpers'
import CoachMessage  from './CoachMessage'
import StartNowPanel from './StartNowPanel'
import { useCoach }  from '../hooks/useCoach'

function ProgressBar({ value }) {
  return (
    <div className="progress-track">
      <div
        className="progress-fill"
        style={{ width: `${value}%`, background: getProgressColor(value) }}
      />
    </div>
  )
}

export default function TaskList({ tasks, onUpdateProgress, onAddTask }) {
  const { activePanelId, togglePanel, closePanel } = useCoach()

  return (
    <div className="task-list-section">
      <div className="section-header">
        <h2 className="section-title">Your Tasks</h2>
        <button className="btn-primary" onClick={onAddTask}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5"  y1="12" x2="19" y2="12" />
          </svg>
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet. Add your first task to get started!</p>
        </div>
      ) : (
        <div className="task-table">
          {/* Head */}
          <div className="task-table-head">
            <span>Task</span>
            <span>Deadline</span>
            <span>Effort</span>
            <span>Status</span>
            <span>Progress</span>
          </div>

          {/* Rows */}
          {tasks.map((task) => {
            const daysLeft  = getDaysLeft(task.deadline)
            const isUrgent  = daysLeft === 'Overdue' || daysLeft === 'Today'
            const sc        = STATUS_CONFIG[task.status]  || STATUS_CONFIG['Pending']
            const ec        = EFFORT_COLORS[task.effort]  || EFFORT_COLORS['Medium']
            const isAtRisk  = task.status === 'At Risk'
            const isPanelOpen = activePanelId === task.id

            return (
              <div key={task.id} className="task-row-wrap">
                {/* Main row */}
                <div className={`task-row ${isAtRisk ? 'task-row--risk' : ''}`}>
                  {/* Name */}
                  <div className="task-name-cell">
                    <div className="task-dot" style={{ background: sc.dot }} />
                    <div>
                      <p className="task-name">{task.name}</p>
                      <p className="task-importance">{task.importance}</p>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className={`task-deadline ${isUrgent ? 'task-deadline--urgent' : ''}`}>
                    {daysLeft}
                  </div>

                  {/* Effort */}
                  <span className="effort-badge" style={{ background: ec.bg, color: ec.text }}>
                    {task.effort}
                  </span>

                  {/* Status */}
                  <span className="status-badge" style={{ background: sc.bg, color: sc.text }}>
                    <span className="status-dot" style={{ background: sc.dot }} />
                    {task.status}
                  </span>

                  {/* Progress + Start Now */}
                  <div className="progress-cell">
                    <ProgressBar value={task.progress} />
                    <span className="progress-pct">{task.progress}%</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={task.progress}
                      className="progress-slider"
                      onChange={(e) => onUpdateProgress(task.id, Number(e.target.value))}
                      title="Drag to update progress"
                    />
                    {/* Start Now button — only on at-risk or 0% tasks */}
                    {(isAtRisk || task.progress === 0) && task.status !== 'Done' && (
                      <button
                        className={`start-now-btn ${isPanelOpen ? 'start-now-btn--active' : ''}`}
                        onClick={() => togglePanel(task.id)}
                        title="Start Now"
                      >
                        {isPanelOpen ? '✕' : '▶'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Coach message — shown for at-risk or overdue tasks */}
                {(isAtRisk || isUrgent) && task.status !== 'Done' && (
                  <CoachMessage task={task} />
                )}

                {/* Start Now expandable panel */}
                {isPanelOpen && (
                  <StartNowPanel task={task} onClose={() => closePanel()} />
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}