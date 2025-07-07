import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // Start with loading true
  const [error, setError] = useState(null)

  const BASE_URL = 'https://riseandhackparishackathon.onrender.com'

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/auth/check`, {
          withCredentials: true
        })

        if (response.data.loggedIn) {
          const userResponse = await axios.get(`${BASE_URL}/auth/user`, {
            withCredentials: true
          })
          setUser(userResponse.data.user)
        } else {
          navigate('/login')
          setUser(null)
        }
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  const signup = async (name, email, password) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.post(
        `${BASE_URL}/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      )
      setUser(response.data.user)
      window.location.reload()
      navigate('/')
      // Refresh the page after short delay to ensure navigation completes
    } catch (error) {
      setError(error.response?.data?.error || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const signin = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.post(
        `${BASE_URL}/auth/signin`,
        { email, password },
        { withCredentials: true }
      )
      setUser(response.data.user)
      navigate('document')
      // Refresh the page after short delay to ensure navigation completes
      setTimeout(() => window.location.reload(), 100)
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const signout = async () => {
    try {
      await axios.get(`${BASE_URL}/auth/signout`, { withCredentials: true })
      setUser(null)
      navigate('/login')
    } catch (error) {
      setError('Logout failed')
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, error, signup, signin, signout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Remove any default export - only use named exports
