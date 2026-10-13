import { useEffect, useMemo, useState } from 'react'
import { getTasks } from '../services/tasksApi'
import { formatDate, getMonthGrid, toISODate } from '../utils/dateHelpers'

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function CalendarPage() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks()
        setTasks(data)
      } catch {
        setError('Could not load calendar data')
      }
    }

    loadTasks()
  }, [])

  const monthGrid = useMemo(
    () => getMonthGrid(currentDate.getFullYear(), currentDate.getMonth()),
    [currentDate],
  )

  const tasksByDate = useMemo(() => {
    return tasks.reduce((acc, task) => {
      const key = toISODate(task.dueDate)
      if (!key) return acc
      if (!acc[key]) acc[key] = []
      acc[key].push(task)
      return acc
    }, {})
  }, [tasks])

  const moveMonth = (offset) => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1))
  }

  const monthTitle = currentDate.toLocaleString(undefined, {
    month: 'long',
    year: 'numeric',
  })

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => moveMonth(-1)}
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Prev
          </button>
          <p className="min-w-44 text-center font-semibold">{monthTitle}</p>
          <button
            type="button"
            onClick={() => moveMonth(1)}
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Next
          </button>
        </div>
      </div>

      {error && <p className="rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}

      <div className="grid grid-cols-7 gap-2">
        {DAY_NAMES.map((day) => (
          <div key={day} className="rounded-md bg-slate-200 p-2 text-center text-sm font-semibold dark:bg-slate-700">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {monthGrid.map((cell) => {
          const key = toISODate(cell.date)
          const dayTasks = tasksByDate[key] || []
          return (
            <div
              key={`${key}-${cell.isCurrentMonth}`}
              className={`min-h-28 rounded-lg border p-2 ${
                cell.isCurrentMonth
                  ? 'bg-white dark:bg-slate-800'
                  : 'bg-slate-50 text-slate-400 dark:bg-slate-800/40'
              }`}
            >
              <p className="mb-2 text-xs font-semibold">{formatDate(cell.date)}</p>
              <div className="space-y-1">
                {dayTasks.slice(0, 2).map((task) => (
                  <p key={task.id} className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-500/20">
                    {task.title}
                  </p>
                ))}
                {dayTasks.length > 2 && <p className="text-xs text-slate-500">+{dayTasks.length - 2} more</p>}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default CalendarPage
