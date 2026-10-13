import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createTask, getTaskById, updateTask } from '../services/tasksApi'
import { STATUS_OPTIONS, TASK_STATUS } from '../constants/taskStatus'
import { toISODate } from '../utils/dateHelpers'

const initialForm = {
  title: '',
  description: '',
  status: TASK_STATUS.TODO,
  dueDate: '',
}

function TaskFormPage({ mode }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(mode === 'edit')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (mode !== 'edit' || !id) return

    async function loadTask() {
      try {
        const task = await getTaskById(id)

        if (!task) {
          setError('Task not found')
          return
        }

        setForm({
          title: task.title || '',
          description: task.description || '',
          status: task.status || TASK_STATUS.TODO,
          dueDate: toISODate(task.dueDate),
        })
      } catch {
        setError('Could not load task details')
      } finally {
        setLoading(false)
      }
    }

    loadTask()
  }, [id, mode])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')

    try {
      if (mode === 'edit' && id) {
        await updateTask(id, form)
      } else {
        await createTask(form)
      }
      navigate('/tasks')
    } catch {
      setError('Could not save task')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="card">Loading task...</div>

  return (
    <section className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{mode === 'edit' ? 'Edit Task' : 'Add Task'}</h1>
        <Link to="/tasks" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Back to Tasks
        </Link>
      </div>

      {error && <p className="rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}

      <form onSubmit={handleSubmit} className="card space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-3 py-2 outline-none ring-blue-500 focus:ring-2 dark:bg-slate-900"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border px-3 py-2 outline-none ring-blue-500 focus:ring-2 dark:bg-slate-900"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 outline-none ring-blue-500 focus:ring-2 dark:bg-slate-900"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 outline-none ring-blue-500 focus:ring-2 dark:bg-slate-900"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-70"
        >
          {saving ? 'Saving...' : mode === 'edit' ? 'Update Task' : 'Create Task'}
        </button>
      </form>
    </section>
  )
}

export default TaskFormPage
