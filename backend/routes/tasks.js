import { Router } from 'express'
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/tasksController.js'

const router = Router()

router.get('/',      getAllTasks)   // GET  /api/tasks
router.post('/',     createTask)   // POST /api/tasks
router.put('/:id',   updateTask)   // PUT  /api/tasks/:id
router.delete('/:id', deleteTask)  // DELETE /api/tasks/:id

export default router