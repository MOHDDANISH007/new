// App.jsx
import React from 'react'
import SiderBar from './components/SiderBar'
import { Outlet } from 'react-router-dom'
import { useAuth } from './context/Auth.context'

const App = () => {
  const { user } = useAuth()
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <SiderBar isAuthenticated={!!user} />
kl;lsm;ldm;lsm;f
      {/* Main Content Area */}
      <div className={user ? 'lg:ml-64' : ''}>
        <div className='min-h-screen flex items-center justify-center p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
