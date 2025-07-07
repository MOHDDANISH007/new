import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const BASE_URL = 'https://riseandhackparishackathon.onrender.com'

  // 🔐 Check if user is authenticated on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/auth/check`, {
          withCredentials: true
        })

        if (res.data.loggedIn) {
          const userRes = await axios.get(`${BASE_URL}/auth/user`, {
            withCredentials: true
          })
          setUser(userRes.data.user)
        } else {
          setUser(null)
          navigate('/login')
        }
      } catch (err) {
        console.error('Auth check failed:', err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [navigate]) // ⛔ Don't forget dependency

  // 📝 Signup
  const signup = async (name, email, password) => {
    try {
      setLoading(true)
      setError(null)

      const res = await axios.post(
        `${BASE_URL}/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      )

      setUser(res.data.user)
      navigate('/document')
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  // 🔑 Signin
  const signin = async (email, password) => {
    try {
      setLoading(true)
      setError(null)

      const res = await axios.post(
        `${BASE_URL}/auth/signin`,
        { email, password },
        { withCredentials: true }
      )

      setUser(res.data.user)
     
      navigate.reload()
      navigate('/document')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  // 🚪 Signout
  const signout = async () => {
    try {
      await axios.get(`${BASE_URL}/auth/signout`, { withCredentials: true })
      setUser(null)
      navigate('/login')
    } catch (err) {
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
