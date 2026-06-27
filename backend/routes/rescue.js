import { Router }         from 'express'
import { generateRescuePlan } from '../controllers/rescueController.js'

const router = Router()

// POST /api/rescue  — body: { tasks: [...] }
// Returns AI-generated prioritization + rescue plan
router.post('/', generateRescuePlan)

export default router