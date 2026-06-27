import { useState } from 'react'

const INITIAL_TASKS = [
  {
    id: 1,
    name: 'Submit assignment',
    deadline: '2025-06-26',
    effort: 'High',
    importance: 'Critical',
    status: 'At Risk',
    progress: 20,
  },
  {
    id: 2,
    name: 'Call tutor for session',
    deadline: '2025-06-27',
    effort: 'Low',
    importance: 'Medium',
    status: 'On Track',
    progress: 0,
  },
  {
    id: 3,
    name: 'Finish presentation slides',
    deadline: '2025-06-28',
    effort: 'Medium',
    importance: 'High',
    status: 'Pending',
    progress: 45,
  },
  {
    id: 4,
    name: 'Pay internet bill',
    deadline: '2025-06-29',
    effort: 'Low',
    importance: 'Medium',
    status: 'On Track',
    progress: 0,
  },
]

export function useTasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)

  const addTask = (taskData) => {
    setTasks((prev) => [
      ...prev,
      {
        ...taskData,
        id: Date.now(),
        status: 'Pending',
        progress: 0,
      },
    ])
  }

  const updateProgress = (id, progress) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, progress, status: progress === 100 ? 'Done' : t.status }
          : t
      )
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const atRiskCount   = tasks.filter((t) => t.status === 'At Risk').length
  const completedCount = tasks.filter((t) => t.progress === 100).length

  return { tasks, addTask, updateProgress, deleteTask, atRiskCount, completedCount }
}