import { getRescuePlan } from '../services/geminiService.js'

export const generateRescuePlan = async (req, res, next) => {
  console.log('Rescue endpoint hit')
  console.log('API Key present:', !!process.env.ANTHROPIC_API_KEY)
  try {
    const { tasks } = req.body
    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
      return res.status(400).json({ success: false, message: 'tasks array is required' })
    }
    console.log('Sending', tasks.length, 'tasks to Claude...')
    const data = await getRescuePlan(tasks)
    res.json({ success: true, data })
  } catch (err) {
    console.error('Rescue plan error:', err.message)
    res.status(500).json({ success: false, message: err.message })
  }
}