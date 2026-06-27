import { useState } from 'react'

const DEFAULT_FORM = {
  name: '',
  deadline: '',
  effort: 'Medium',
  importance: 'Medium',
}

export default function AddTaskModal({ onClose, onAdd }) {
  const [form, setForm] = useState(DEFAULT_FORM)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.deadline) return
    onAdd(form)
    onClose()
  }

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }))

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5"  y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <h2 className="modal-title">Add New Task</h2>
          </div>
          <button className="modal-close" onClick={onClose} title="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9BA3AF" strokeWidth="2">
              <line x1="18" y1="6"  x2="6"  y2="18" />
              <line x1="6"  y1="6"  x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Task Name *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Submit project report"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Deadline *</label>
            <input
              type="date"
              className="form-input"
              value={form.deadline}
              onChange={(e) => set('deadline', e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Effort</label>
              <select
                className="form-select"
                value={form.effort}
                onChange={(e) => set('effort', e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Importance</label>
              <select
                className="form-select"
                value={form.importance}
                onChange={(e) => set('importance', e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}