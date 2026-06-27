// Day 2: This controller will call the Gemini API via geminiService.js
// and return a prioritized task list + rescue plan with micro-steps.

export const generateRescuePlan = async (req, res) => {
  // Stub response — replace body with real AI call on Day 2
  const { tasks } = req.body

  if (!tasks || !Array.isArray(tasks)) {
    return res.status(400).json({ success: false, message: 'tasks array is required' })
  }

  // TODO Day 2: call geminiService.getRescuePlan(tasks)
  res.json({
    success: true,
    message: 'AI rescue plan endpoint ready — wire Gemini on Day 2',
    data: {
      prioritized: [],
      atRisk: [],
      rescuePlan: null,
    },
  })
}