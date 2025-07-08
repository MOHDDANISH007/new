// App.jsx
import React, { useEffect } from 'react'
import SiderBar from './components/SiderBar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './context/Auth.context'
import WelcomeSection from './components/Welcome'

const App = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect to "/" after login, but NOT if already on another route like "/document"
  useEffect(() => {
    if (!user && location.pathname === '/login') {
      navigate('/login')
    }
  }, [user, location.pathname, navigate])

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex'>
      <SiderBar isAuthenticated={!!user} />

      <div className={`flex-1 ${user ? 'lg:ml-64' : ''}`}>
        {user ? (
          <div className='min-h-screen flex items-center justify-center p-4'>
            <Outlet />
          </div>
        ) : (
          <div className='min-h-screen flex items-center justify-center'>
            <WelcomeSection />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
