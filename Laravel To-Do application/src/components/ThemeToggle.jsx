import { useTheme } from '../context/ThemeContext'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700"
    >
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  )
}

export default ThemeToggle
