import { useState } from 'react'
import { getQuickStartSteps } from '../utils/riskEngine'

/**
 * useCoach
 * Manages which task has the "Start Now" panel expanded
 * and provides quick-start steps for that task.
 */
export function useCoach() {
  const [activePanelId, setActivePanelId] = useState(null)

  const togglePanel = (taskId) => {
    setActivePanelId((prev) => (prev === taskId ? null : taskId))
  }

  const closePanel = () => setActivePanelId(null)

  const getSteps = (task) => getQuickStartSteps(task)

  return { activePanelId, togglePanel, closePanel, getSteps }
}