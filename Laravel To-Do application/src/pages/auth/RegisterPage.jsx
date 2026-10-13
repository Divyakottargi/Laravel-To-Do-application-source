import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../services/authApi'
import { useAuth } from '../../context/AuthContext'

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { loginWithToken } = useAuth()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await register(form)
      const token = data?.token || data?.accessToken
      if (token) {
        loginWithToken(token)
        navigate('/dashboard', { replace: true })
      } else {
        navigate('/login', { replace: true })
      }
    } catch (err) {
      const backendMessage = err?.response?.data?.message
      const validationErrors = err?.response?.data?.errors
      const firstValidationMessage = validationErrors
        ? Object.values(validationErrors)?.[0]?.[0]
        : null

      setError(firstValidationMessage || backendMessage || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow dark:bg-slate-800">
        <h1 className="mb-1 text-2xl font-bold">Register</h1>
        <p className="mb-4 text-sm text-slate-500">Create your account to continue.</p>

        {error && <p className="mb-3 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2 outline-none ring-blue-500 focus:ring-2 dark:bg-slate-900"
            />
          </div>

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

          <div>
            <label className="mb-1 block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
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
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-500">
          Have an account?{' '}
          <Link className="font-medium text-blue-600 hover:text-blue-700" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
