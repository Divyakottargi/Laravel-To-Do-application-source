import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { AUTH_TOKEN_KEY } from '../services/apiClient'
import apiClient from '../services/apiClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem(AUTH_TOKEN_KEY))

  useEffect(() => {
    const interceptorId = apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          localStorage.removeItem(AUTH_TOKEN_KEY)
          setToken(null)
        }
        return Promise.reject(error)
      },
    )

    return () => {
      apiClient.interceptors.response.eject(interceptorId)
    }
  }, [])

  const loginWithToken = (nextToken) => {
    localStorage.setItem(AUTH_TOKEN_KEY, nextToken)
    setToken(nextToken)
  }

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    setToken(null)
  }

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      token,
      loginWithToken,
      logout,
    }),
    [token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
