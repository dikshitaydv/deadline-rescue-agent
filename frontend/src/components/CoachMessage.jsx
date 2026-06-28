import { getCoachMessage } from '../utils/riskEngine'

const TYPE_STYLES = {
  danger:  { bg: '#FEF2F2', border: '#FECACA', text: '#B91C1C' },
  warning: { bg: '#FFFBEB', border: '#FDE68A', text: '#92400E' },
  info:    { bg: '#EEF2FF', border: '#C7D2FE', text: '#3730A3' },
  success: { bg: '#ECFDF5', border: '#A7F3D0', text: '#065F46' },
}

export default function CoachMessage({ task }) {
  const { type, message } = getCoachMessage(task)
  const styles = TYPE_STYLES[type] || TYPE_STYLES.info

  return (
    <div
      className="coach-message"
      style={{
        background:   styles.bg,
        borderColor:  styles.border,
        color:        styles.text,
      }}
    >
      {message}
    </div>
  )
}