import { useState } from 'react'
import Sidebar             from '../components/Sidebar'
import TopBar              from '../components/TopBar'
import WelcomeCard         from '../components/WelcomeCard'
import StatsRow            from '../components/StatsRow'
import TaskList            from '../components/TaskList'
import NotificationsPanel  from '../components/NotificationsPanel'
import AddTaskModal        from '../components/AddTaskModal'
import { useTasks }        from '../hooks/useTasks'

export default function Dashboard() {
  const {
    tasks,
    addTask,
    updateProgress,
    atRiskCount,
    completedCount,
  } = useTasks()

  const [activeNav,  setActiveNav]  = useState('dashboard')
  const [showModal,  setShowModal]  = useState(false)

  // Placeholder — will call the AI rescue API in Day 2
  const handleRescue = () => {
    alert('Rescue Plan coming in Day 2! AI will generate your action plan here.')
  }

  return (
    <div className="app-shell">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <div className="main-area">
        <TopBar />

        <div className="content-grid">
          {/* Left column */}
          <div className="left-col">
            <WelcomeCard onAddTask={() => setShowModal(true)} />
            <StatsRow
              total={tasks.length}
              atRisk={atRiskCount}
              completed={completedCount}
            />
            <TaskList
              tasks={tasks}
              onUpdateProgress={updateProgress}
              onAddTask={() => setShowModal(true)}
            />
          </div>

          {/* Right column */}
          <div className="right-col">
            <NotificationsPanel tasks={tasks} onRescue={handleRescue} />
          </div>
        </div>
      </div>

      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          onAdd={addTask}
        />
      )}
    </div>
  )
}