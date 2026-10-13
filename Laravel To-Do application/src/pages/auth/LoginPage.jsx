import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../../services/authApi'
import { useAuth } from '../../context/AuthContext'

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { loginWithToken } = useAuth()

  const from = location.state?.from?.pathname || '/dashboard'

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await login(form)
      const token = data?.token || data?.accessToken
      if (!token) {
        throw new Error('Missing token')
      }
      loginWithToken(token)
      navigate(from, { replace: true })
    } catch (err) {
      const backendMessage = err?.response?.data?.message
      const validationErrors = err?.response?.data?.errors
      const firstValidationMessage = validationErrors
        ? Object.values(validationErrors)?.[0]?.[0]
        : null
      setError(firstValidationMessage || backendMessage || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow dark:bg-slate-800">
        <h1 className="mb-1 text-2xl font-bold">Login</h1>
        <p className="mb-4 text-sm text-slate-500">Welcome back. Please sign in.</p>

        {error && <p className="mb-3 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2 outline-none ring-blue-500 focus:ring-2 dark:bg-slate-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2 outline-none ring-blue-500 focus:ring-2 dark:bg-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-500">
          No account?{' '}
          <Link className="font-medium text-blue-600 hover:text-blue-700" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
