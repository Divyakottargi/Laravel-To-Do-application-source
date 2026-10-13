import { Link } from 'react-router-dom'
import { STATUS_COLOR, STATUS_OPTIONS } from '../constants/taskStatus'
import { formatDate } from '../utils/dateHelpers'

function TaskList({ tasks, onDelete }) {
  const getStatusLabel = (statusValue) =>
    STATUS_OPTIONS.find((status) => status.value === statusValue)?.label || statusValue

  if (!tasks.length) {
    return <div className="card">No tasks found.</div>
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm dark:bg-slate-800">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 dark:bg-slate-700">
          <tr>
            <th className="px-4 py-3 font-semibold">Title</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Due Date</th>
            <th className="px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t">
              <td className="px-4 py-3">{task.title}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${STATUS_COLOR[task.status]}`}>
                  {getStatusLabel(task.status)}
                </span>
              </td>
              <td className="px-4 py-3">{formatDate(task.dueDate)}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Link
                    to={`/tasks/${task.id}/edit`}
                    className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete(task.id)}
                    className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TaskList
