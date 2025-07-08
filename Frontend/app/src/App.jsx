// App.jsx
import React from 'react'
import SiderBar from './components/SiderBar'
import { Outlet } from 'react-router-dom'
import { useAuth } from './context/Auth.context'
import WelcomeSection from './components/Welcome'

const App = () => {
  const { user } = useAuth()
  const [count, setCount] = React.useState(0)
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <SiderBar isAuthenticated={!!user} />
      {count === 0 && (
        <div>
          <WelcomeSection count={count} setCount={setCount} />
        </div>
      )}
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
