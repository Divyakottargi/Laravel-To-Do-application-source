import { useEffect, useMemo, useState } from 'react'
import { getTasks } from '../services/tasksApi'
import { TASK_STATUS } from '../constants/taskStatus'

function DashboardPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks()
        setTasks(data)
      } catch {
        setError('Could not load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  const summary = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.status === TASK_STATUS.DONE).length
    const pending = total - completed
    return { total, completed, pending }
  }, [tasks])

  return (
    <section className="space-y-5">
      <div className="card">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-slate-500">Here is a quick overview of your tasks.</p>
      </div>

      {error && <p className="rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card">
          <h2 className="text-sm text-slate-500">Total Tasks</h2>
          <p className="mt-2 text-3xl font-bold text-blue-600">{loading ? '...' : summary.total}</p>
        </div>
        <div className="card">
          <h2 className="text-sm text-slate-500">Completed Tasks</h2>
          <p className="mt-2 text-3xl font-bold text-emerald-600">{loading ? '...' : summary.completed}</p>
        </div>
        <div className="card">
          <h2 className="text-sm text-slate-500">Pending Tasks</h2>
          <p className="mt-2 text-3xl font-bold text-amber-600">{loading ? '...' : summary.pending}</p>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
