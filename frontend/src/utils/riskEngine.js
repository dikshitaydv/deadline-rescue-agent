/**
 * riskEngine.js
 * Pure functions that determine task risk level and generate coach messages.
 * Used by useTasks hook to auto-update statuses and by CoachMessage component.
 */

/**
 * Returns days remaining until deadline (negative = overdue)
 */
export function daysUntilDeadline(deadline) {
  return Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24))
}

/**
 * Effort multiplier — High effort tasks need more time buffer
 */
const EFFORT_MULTIPLIER = { Low: 1, Medium: 1.5, High: 2.5 }

/**
 * Calculate a risk score 0-100 for a task.
 * Higher = more at risk.
 */
export function calcRiskScore(task) {
  const days       = daysUntilDeadline(task.deadline)
  const effort     = EFFORT_MULTIPLIER[task.effort] || 1.5
  const remaining  = 100 - task.progress
  const importance = task.importance === 'Critical' ? 1.4
                   : task.importance === 'High'     ? 1.2
                   : task.importance === 'Medium'   ? 1.0
                   : 0.8

  if (days < 0)  return 100  // overdue = max risk
  if (days === 0) return 95  // due today = near max

  // Base score: how much work left vs time available adjusted for effort
  const base = (remaining * effort * importance) / Math.max(days, 0.5)
  return Math.min(Math.round(base * 10), 100)
}

/**
 * Determine if a task should be marked At Risk automatically.
 * Rules:
 * - Overdue → always At Risk
 * - Due within 1 day and progress < 80% → At Risk
 * - Due within 2 days and progress < 50% → At Risk
 * - Due within 3 days and progress < 20% and effort is High → At Risk
 */
export function shouldBeAtRisk(task) {
  if (task.status === 'Done') return false
  const days = daysUntilDeadline(task.deadline)

  if (days < 0)                                          return true
  if (days <= 1 && task.progress < 80)                   return true
  if (days <= 2 && task.progress < 50)                   return true
  if (days <= 3 && task.progress < 20 && task.effort === 'High') return true

  return false
}

/**
 * Generate a coach message for a task based on its current state.
 * Returns { type, message, action } where type is 'danger' | 'warning' | 'info' | 'success'
 */
export function getCoachMessage(task) {
  const days = daysUntilDeadline(task.deadline)

  if (task.progress === 100) {
    return {
      type: 'success',
      message: '🎉 Done! Great work completing this.',
      action: null,
    }
  }

  if (days < 0) {
    return {
      type: 'danger',
      message: '🔴 This task is overdue. Submit whatever you have right now.',
      action: 'Submit now',
    }
  }

  if (days === 0 && task.progress < 80) {
    return {
      type: 'danger',
      message: `🚨 Due TODAY with only ${task.progress}% done. Drop everything and focus on this.`,
      action: 'Start now',
    }
  }

  if (days <= 1 && task.progress === 0) {
    return {
      type: 'danger',
      message: '🔴 Due tomorrow and not started. Open it right now — even 15 mins helps.',
      action: 'Start now',
    }
  }

  if (days <= 1) {
    return {
      type: 'danger',
      message: `⚠️ Due tomorrow — ${100 - task.progress}% still remaining. Push hard today.`,
      action: 'Continue now',
    }
  }

  if (days <= 2 && task.progress < 30) {
    return {
      type: 'warning',
      message: `⏰ ${days} days left with only ${task.progress}% done. Start a focused session now.`,
      action: 'Start session',
    }
  }

  if (days <= 3 && task.progress === 0) {
    return {
      type: 'warning',
      message: `📌 Not started yet — ${days} days left. Schedule a block today.`,
      action: 'Schedule block',
    }
  }

  if (task.effort === 'High' && days <= 4 && task.progress < 40) {
    return {
      type: 'warning',
      message: `💪 High effort task — only ${days} days left. Break it into daily chunks.`,
      action: 'Plan chunks',
    }
  }

  if (task.progress > 60) {
    return {
      type: 'info',
      message: `✅ ${task.progress}% done — you're over halfway! Keep the momentum.`,
      action: null,
    }
  }

  return {
    type: 'info',
    message: `📋 ${days} days remaining. Stay on track with steady progress.`,
    action: null,
  }
}

/**
 * Generate a "Start Now" micro-plan for a task (3 steps, no AI needed)
 * Used as a fallback when AI rescue plan isn't triggered
 */
export function getQuickStartSteps(task) {
  const steps = {
    High: [
      `Open your materials for "${task.name}" and read through what's needed — 10 mins`,
      'Write a quick bullet-point outline of what needs to be done — 10 mins',
      'Set a 25-minute timer and work on the first section without distraction',
    ],
    Medium: [
      `Pull up everything related to "${task.name}" — 5 mins`,
      'Identify the single most important thing to complete first',
      'Set a 20-minute timer and do just that one thing',
    ],
    Low: [
      `Open "${task.name}" right now — it only takes a moment to start`,
      'Complete the first step in under 10 minutes',
      'Mark it done or set a reminder for the next part',
    ],
  }
  return steps[task.effort] || steps['Medium']
}