import { useState } from 'react'
import axios from 'axios'

const VITE_API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '')

export function useRescue() {
  const [rescuePlan, setRescuePlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generatePlan = async (tasks) => {
    setLoading(true)
    setError(null)

    try {
      const { data } = await axios.post(`${VITE_API_BASE_URL}/api/rescue`, { tasks })
      setRescuePlan(data.data)
    } catch (err) {
      console.error('Rescue plan error:', err.response?.data || err.message)
      setError('Failed to generate rescue plan. Check your API key.')
    } finally {
      setLoading(false)
    }
  }

  const clearPlan = () => setRescuePlan(null)

  return { rescuePlan, loading, error, generatePlan, clearPlan }
}