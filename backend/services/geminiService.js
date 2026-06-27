import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join }  from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = dirname(__filename)
dotenv.config({ path: join(__dirname, '../../.env') })

export async function getRescuePlan(tasks) {
  const apiKey = process.env.GEMINI_API_KEY
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`

  const prompt = `You are a deadline rescue agent helping a student avoid missing deadlines.

Given these tasks, do three things:
1. Rank ALL tasks by urgency (deadline closeness + effort + importance).
2. Identify which tasks are at risk and why.
3. For the highest-risk task, give exactly 4 micro-steps the user can start RIGHT NOW.

Tasks:
${JSON.stringify(tasks, null, 2)}

Respond ONLY with valid JSON, no markdown, no backticks:
{
  "prioritized": [
    { "id": 1, "name": "...", "urgencyScore": 95, "reason": "..." }
  ],
  "atRisk": [
    { "id": 1, "name": "...", "reason": "..." }
  ],
  "rescuePlan": {
    "taskId": 1,
    "taskName": "...",
    "summary": "...",
    "timeEstimate": "2 hours total",
    "steps": ["step 1", "step 2", "step 3", "step 4"]
  }
}`

  console.log('Calling Gemini REST API...')

  const response = await fetch(url, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  })

  const data = await response.json()
  console.log('Gemini status:', response.status)

  if (!response.ok) {
    throw new Error(JSON.stringify(data))
  }

  const text  = data.candidates[0].content.parts[0].text
  console.log('Gemini raw response:', text.slice(0, 100))
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}