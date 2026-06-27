import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export async function getRescuePlan(tasks) {
  const prompt = `
You are a deadline rescue agent helping a student/professional avoid missing deadlines.

Given the following tasks, do three things:
1. Rank ALL tasks by urgency (consider: deadline closeness, effort required, importance level).
2. Identify which tasks are "at risk" of being missed and why.
3. For the single highest-risk task, generate a concrete rescue plan with exactly 4 micro-steps the user can start RIGHT NOW. Each step should take 15-30 mins max.

Tasks:
${JSON.stringify(tasks, null, 2)}

Respond ONLY with valid JSON. No markdown, no explanation, just the JSON object:
{
  "prioritized": [
    { "id": 1, "name": "...", "urgencyScore": 95, "reason": "Due tomorrow, high effort, critical importance" }
  ],
  "atRisk": [
    { "id": 1, "name": "...", "reason": "Less than 24 hours with only 20% progress" }
  ],
  "rescuePlan": {
    "taskId": 1,
    "taskName": "...",
    "summary": "One sentence on how to approach this now",
    "timeEstimate": "2 hours total",
    "steps": [
      "Open the document and write just the introduction — 15 mins",
      "Draft the 3 main sections in bullet points first — 20 mins",
      "Expand bullets into full sentences — 30 mins",
      "Review, spell check, and submit — 15 mins"
    ]
  }
}
`
  const result = await model.generateContent(prompt)
  const text   = result.response.text()
  const clean  = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}