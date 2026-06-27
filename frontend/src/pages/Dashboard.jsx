import { useState } from 'react'
import Sidebar            from '../components/Sidebar'
import TopBar             from '../components/TopBar'
import WelcomeCard        from '../components/WelcomeCard'
import StatsRow           from '../components/StatsRow'
import TaskList           from '../components/TaskList'
import NotificationsPanel from '../components/NotificationsPanel'
import AddTaskModal       from '../components/AddTaskModal'
import RescuePlanModal    from '../components/RescuePlanModal'
import { useTasks }       from '../hooks/useTasks'
import { useRescue }      from '../hooks/useRescue'

export default function Dashboard() {
  const {
    tasks,
    addTask,
    updateProgress,
    atRiskCount,
    completedCount,
  } = useTasks()

  const {
    rescuePlan,
    loading,
    error,
    generatePlan,
    clearPlan,
  } = useRescue()

  const [activeNav,   setActiveNav]   = useState('dashboard')
  const [showModal,   setShowModal]   = useState(false)
  const [showRescue,  setShowRescue]  = useState(false)

  const handleRescue = () => {
    setShowRescue(true)
    generatePlan(tasks)
  }

  const handleCloseRescue = () => {
    setShowRescue(false)
    clearPlan()
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

      {/* Add Task Modal */}
      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          onAdd={addTask}
        />
      )}

      {/* Rescue Plan Modal (Day 2) */}
      {showRescue && (
        <RescuePlanModal
          plan={rescuePlan}
          loading={loading}
          error={error}
          onClose={handleCloseRescue}
        />
      )}
    </div>
  )
}