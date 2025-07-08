// App.jsx
import React from 'react'
import SiderBar from './components/SiderBar'
import { Outlet } from 'react-router-dom'
import { useAuth } from './context/Auth.context'
import WelcomeSection from './components/Welcome'

const App = () => {
  const { user } = useAuth()

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex'>
      <SiderBar isAuthenticated={!!user} />

      <div className={`flex-1 ${user ? 'lg:ml-64' : ''}`}>
        {user ? (
          // Main content if user is logged in
          <div className='min-h-screen flex items-center justify-center p-4'>
            <Outlet />
          </div>
        ) : (
          // Show WelcomeSection if no user
          <div className='min-h-screen flex items-center justify-center'>
            <WelcomeSection />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
