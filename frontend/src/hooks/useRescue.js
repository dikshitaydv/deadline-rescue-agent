import { useState } from 'react'
import axios from 'axios'

export function useRescue() {
  const [rescuePlan, setRescuePlan]   = useState(null)
  const [loading,    setLoading]      = useState(false)
  const [error,      setError]        = useState(null)

  const generatePlan = async (tasks) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await axios.post('/api/rescue', { tasks })
      setRescuePlan(data.data)
    } catch (err) {
      setError('Failed to generate rescue plan. Check your API key.')
    } finally {
      setLoading(false)
    }
  }

  const clearPlan = () => setRescuePlan(null)

  return { rescuePlan, loading, error, generatePlan, clearPlan }
}