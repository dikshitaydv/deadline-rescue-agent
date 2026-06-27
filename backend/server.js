import { fileURLToPath } from 'url'
import { dirname, join }  from 'path'
import dotenv             from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = dirname(__filename)

// Explicitly point to root .env
dotenv.config({ path: join(__dirname, '../.env') })

import express      from 'express'
import cors         from 'cors'
import taskRoutes   from './routes/tasks.js'
import rescueRoutes from './routes/rescue.js'

const app  = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

app.use('/api/tasks',  taskRoutes)
app.use('/api/rescue', rescueRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// Confirm key loaded on startup
console.log('Gemini API Key loaded:', !!process.env.GEMINI_API_KEY)

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`)
})