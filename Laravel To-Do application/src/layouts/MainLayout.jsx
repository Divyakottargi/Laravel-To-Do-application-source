import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import NotificationDropdown from '../components/NotificationDropdown'
import { useAuth } from '../context/AuthContext'
import { logout as logoutApi } from '../services/authApi'

function MainLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutApi()
    } catch {
      // Client-side logout should still proceed.
    }
    logout()
    navigate('/login')
  }

  const navItemClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700'
    }`

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white/90 backdrop-blur dark:bg-slate-800/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/dashboard" className="text-lg font-bold text-blue-700 dark:text-blue-300">
            Task Manager
          </Link>

          <nav className="flex items-center gap-2">
            <NavLink to="/dashboard" className={navItemClass}>
              Dashboard
            </NavLink>
            <NavLink to="/tasks" className={navItemClass}>
              Tasks
            </NavLink>
            <NavLink to="/calendar" className={navItemClass}>
              Calendar
            </NavLink>
            <NotificationDropdown />
            <ThemeToggle />
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
