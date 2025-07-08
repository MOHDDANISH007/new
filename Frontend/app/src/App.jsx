// App.jsx
import React from 'react'
import SiderBar from './components/SiderBar'
import { Outlet } from 'react-router-dom'
import { useAuth } from './context/Auth.context'
import WelcomeSection from './components/Welcome'
import { motion } from 'framer-motion'

const App = () => {
  const { user } = useAuth()
  const [count, setCount] = React.useState(0)
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <SiderBar count={count} setCount={setCount} isAuthenticated={!!user} />
      {user && count === 0 && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <WelcomeSection count={count} setCount={setCount} />
          </div>
        </motion.div>
      )}
      {/* Main Content Area */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={user ? 'lg:ml-64' : ''}>
          <div className='min-h-screen flex items-center justify-center p-4'>
            <Outlet />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default App
