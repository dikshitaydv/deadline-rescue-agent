import { useState, useEffect } from 'react'
import { shouldBeAtRisk } from '../utils/riskEngine'

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

/**
 * Auto-apply risk status to tasks based on riskEngine rules.
 * Does not override tasks already marked Done.
 */
function applyAutoRisk(tasks) {
  return tasks.map((t) => {
    if (t.status === 'Done') return t
    if (t.progress === 100)  return { ...t, status: 'Done' }
    if (shouldBeAtRisk(t))   return { ...t, status: 'At Risk' }
    // If it was At Risk but no longer meets criteria, reset to On Track
    if (t.status === 'At Risk' && !shouldBeAtRisk(t)) return { ...t, status: 'On Track' }
    return t
  })
}

export function useTasks() {
  const [tasks, setTasks] = useState(() => applyAutoRisk(INITIAL_TASKS))

  // Re-run risk engine every 60 seconds in case time passes
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prev) => applyAutoRisk(prev))
    }, 60_000)
    return () => clearInterval(interval)
  }, [])

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now(),
      status: 'Pending',
      progress: 0,
    }
    setTasks((prev) => applyAutoRisk([...prev, newTask]))
  }

  const updateProgress = (id, progress) => {
    setTasks((prev) =>
      applyAutoRisk(
        prev.map((t) =>
          t.id === id ? { ...t, progress } : t
        )
      )
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const atRiskCount    = tasks.filter((t) => t.status === 'At Risk').length
  const completedCount = tasks.filter((t) => t.status === 'Done' || t.progress === 100).length

  return { tasks, addTask, updateProgress, deleteTask, atRiskCount, completedCount }
}