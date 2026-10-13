import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import TaskList from '../components/TaskList'
import { deleteTask, getTasks } from '../services/tasksApi'

function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    try {
      const data = await getTasks()
      setTasks(data)
      setError('')
    } catch {
      setError('Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const filteredTasks = useMemo(() => {
    const query = search.toLowerCase().trim()
    if (!query) return tasks
    return tasks.filter((task) => task.title?.toLowerCase().includes(query))
  }, [tasks, search])

  const handleDelete = async (taskId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this task?')
    if (!shouldDelete) return

    try {
      await deleteTask(taskId)
      setTasks((prev) => prev.filter((task) => task.id !== taskId))
    } catch {
      setError('Could not delete task')
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Link to="/tasks/new" className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
          Add Task
        </Link>
      </div>

      <div className="card">
        <label htmlFor="search" className="mb-2 block text-sm font-medium">
          Search by title
        </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-lg border px-3 py-2 outline-none ring-blue-500 focus:ring-2 dark:bg-slate-900"
          placeholder="Type to search..."
        />
      </div>

      {error && <p className="rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}
      {loading ? <div className="card">Loading tasks...</div> : <TaskList tasks={filteredTasks} onDelete={handleDelete} />}
    </section>
  )
}

export default TasksPage
