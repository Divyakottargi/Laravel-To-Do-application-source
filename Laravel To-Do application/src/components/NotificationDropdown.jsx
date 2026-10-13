import { useEffect, useState } from 'react'
import { getNotifications } from '../services/notificationsApi'

function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await getNotifications()
        setNotifications(Array.isArray(data) ? data : data?.notifications || [])
        setError('')
      } catch {
        setError('Could not load notifications')
      }
    }

    loadNotifications()
  }, [])

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700"
      >
        Notifications
      </button>

      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl border bg-white p-3 shadow-lg dark:bg-slate-800">
          <h3 className="mb-2 text-sm font-semibold">Latest</h3>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {!error && notifications.length === 0 && (
            <p className="text-sm text-slate-500">No new notifications</p>
          )}
          <ul className="space-y-2">
            {notifications.slice(0, 5).map((notification) => (
              <li key={notification.id} className="rounded-lg bg-slate-50 p-2 text-sm dark:bg-slate-700">
                {notification.message || 'New notification'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default NotificationDropdown
