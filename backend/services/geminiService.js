// Day 2: Uncomment and implement this service with your Gemini API key.
//
// import { GoogleGenerativeAI } from '@google/generative-ai'
//
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
// const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
//
// export async function getRescuePlan(tasks) {
//   const prompt = `
//     You are a deadline rescue agent. Given the following tasks, do three things:
//     1. Rank them by urgency (deadline + effort + importance).
//     2. Identify which tasks are "at risk" of being missed.
//     3. For the highest-risk task, generate a rescue plan with 3-5 micro-steps the user can start RIGHT NOW.
//
//     Tasks: ${JSON.stringify(tasks)}
//
//     Respond ONLY as JSON with this shape:
//     {
//       "prioritized": [{ "id": ..., "name": ..., "urgencyScore": ..., "reason": "..." }],
//       "atRisk": [{ "id": ..., "name": ..., "reason": "..." }],
//       "rescuePlan": {
//         "taskId": ...,
//         "taskName": "...",
//         "summary": "...",
//         "steps": ["step 1", "step 2", "step 3"]
//       }
//     }
//   `
//   const result = await model.generateContent(prompt)
//   const text   = result.response.text()
//   return JSON.parse(text.replace(/```json|```/g, '').trim())
// }

export const geminiServiceStub = 'Wire me on Day 2!'