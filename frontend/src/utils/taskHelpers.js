export const EFFORT_COLORS = {
  Low:    { bg: '#ECFDF5', text: '#059669' },
  Medium: { bg: '#FFF7ED', text: '#D97706' },
  High:   { bg: '#FFF0F6', text: '#DB2777' },
}

export const STATUS_CONFIG = {
  'At Risk':  { bg: '#FEF3C7', text: '#B45309', dot: '#F59E0B' },
  'On Track': { bg: '#ECFDF5', text: '#065F46', dot: '#10B981' },
  'Pending':  { bg: '#EEF2FF', text: '#3730A3', dot: '#6366F1' },
  'Done':     { bg: '#F3F4F6', text: '#6B7280', dot: '#9CA3AF' },
}

/**
 * Returns a human-readable label for days remaining until a deadline.
 * @param {string} deadline - ISO date string e.g. "2025-06-27"
 * @returns {string}
 */
export function getDaysLeft(deadline) {
  const diff = Math.ceil(
    (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
  )
  if (diff < 0)  return 'Overdue'
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  return `${diff} days left`
}

/**
 * Returns the progress bar fill color based on completion %.
 * @param {number} value - 0 to 100
 * @returns {string} hex color
 */
export function getProgressColor(value) {
  if (value < 30) return '#F59E0B'
  if (value < 70) return '#4F6BFF'
  return '#10B981'
}