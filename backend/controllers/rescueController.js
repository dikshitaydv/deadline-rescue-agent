import { getRescuePlan } from '../services/geminiService.js'

export const generateRescuePlan = async (req, res, next) => {
  try {
    const { tasks } = req.body
    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
      return res.status(400).json({ success: false, message: 'tasks array is required' })
    }
    const data = await getRescuePlan(tasks)
    res.json({ success: true, data })
  } catch (err) {
    next(err)
  }
}