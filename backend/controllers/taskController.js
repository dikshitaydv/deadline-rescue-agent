// Day 1: In-memory store.
// Day 3+: Replace with a real DB (SQLite / Firebase / Supabase).

let tasks = [
  { id: 1, name: 'Submit assignment',       deadline: '2025-06-26', effort: 'High',   importance: 'Critical', status: 'At Risk',  progress: 20 },
  { id: 2, name: 'Call tutor for session',  deadline: '2025-06-27', effort: 'Low',    importance: 'Medium',   status: 'On Track', progress: 0  },
  { id: 3, name: 'Finish presentation slides', deadline: '2025-06-28', effort: 'Medium', importance: 'High', status: 'Pending',  progress: 45 },
  { id: 4, name: 'Pay internet bill',       deadline: '2025-06-29', effort: 'Low',    importance: 'Medium',   status: 'On Track', progress: 0  },
]

let nextId = 5

export const getAllTasks = (_req, res) => {
  res.json({ success: true, data: tasks })
}

export const createTask = (req, res) => {
  const { name, deadline, effort, importance } = req.body
  if (!name || !deadline) {
    return res.status(400).json({ success: false, message: 'name and deadline are required' })
  }
  const task = { id: nextId++, name, deadline, effort: effort || 'Medium', importance: importance || 'Medium', status: 'Pending', progress: 0 }
  tasks.push(task)
  res.status(201).json({ success: true, data: task })
}

export const updateTask = (req, res) => {
  const id   = Number(req.params.id)
  const idx  = tasks.findIndex((t) => t.id === id)
  if (idx === -1) return res.status(404).json({ success: false, message: 'Task not found' })
  tasks[idx] = { ...tasks[idx], ...req.body, id }
  res.json({ success: true, data: tasks[idx] })
}

export const deleteTask = (req, res) => {
  const id  = Number(req.params.id)
  const len = tasks.length
  tasks     = tasks.filter((t) => t.id !== id)
  if (tasks.length === len) return res.status(404).json({ success: false, message: 'Task not found' })
  res.json({ success: true, message: 'Task deleted' })
}