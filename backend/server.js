import express  from 'express'
import cors     from 'cors'
import dotenv   from 'dotenv'
import taskRoutes   from './routes/tasks.js'
import rescueRoutes from './routes/rescue.js'

dotenv.config({ path: '../.env' })

const app  = express()
const PORT = process.env.PORT || 5000

// ── Middleware ──────────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

// ── Routes ─────────────────────────────────────────────────────
app.use('/api/tasks',  taskRoutes)
app.use('/api/rescue', rescueRoutes)   // Day 2: AI rescue plan endpoint

// ── Health check ───────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Deadline Rescue Agent API is running' })
})

// ── Start ──────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`)
})