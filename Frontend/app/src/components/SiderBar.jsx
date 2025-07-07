import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, LogOut, Menu, X } from 'lucide-react'
import { TbMoneybag } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Auth.context' // Import your auth context

const navItems = [
  { path: '/document', icon: '/documents.png', label: 'AI Documentation' },
  { path: '/dashboard', icon: '/dashboard.png', label: 'Dashboard' },
  { path: '/assets', icon: '/assets.png', label: 'Assets' },
  { path: '/liabilities', icon: '/responsibility.png', label: 'Liabilities' },
  { path: '/loans', icon: '/loan.png', label: 'Loans' },
  { path: '/groqAndLlama', icon: '/robot.png', label: 'Groq and Llama' },
  { path: '/setting', icon: null, label: 'Settings', IconComponent: Settings }
]

const SiderBar = ({ isAuthenticated = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { signout } = useAuth() // Use the signout function from your auth context
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await signout() // Call the signout function from your auth context
      // The auth context will handle the navigation and state clearing
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoggingOut(false)
      setIsMobileMenuOpen(false)
    }
  }

  if (!isAuthenticated) return null

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className='lg:hidden fixed top-4 left-4 z-40 bg-indigo-600 p-2 rounded-lg shadow-md text-white'
        aria-label='Open menu'
      >
        <Menu size={24} />
      </button>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='hidden lg:block fixed h-full z-30 w-64'
      >
        <div className='h-full bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-xl flex flex-col'>
          {/* Logo/Brand */}
          <div className='flex items-center justify-center gap-2 text-2xl font-bold py-6 px-4 border-b border-white/20'>
            <TbMoneybag className='text-indigo-200' size={32} />
            <span className='bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent'>
              FinanceAI
            </span>
          </div>

          {/* Navigation */}
          <nav className='flex-1 px-4 py-6 overflow-y-auto'>
            <ul className='space-y-2'>
              {navItems.map(item => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className='flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-white/10 hover:shadow-md'
                  >
                    {item.IconComponent ? (
                      <item.IconComponent className='w-6 h-6 text-indigo-200' />
                    ) : (
                      <img
                        src={item.icon}
                        className='w-6 h-6 object-contain'
                        alt={item.label}
                      />
                    )}
                    <span className='font-medium'>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer/Logout */}
          <div className='p-4 border-t border-white/10'>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className='flex items-center gap-3 w-full p-3 rounded-lg transition-all hover:bg-white/10 text-red-100 hover:text-white disabled:opacity-50'
            >
              <LogOut className='w-5 h-5' />
              <span className='font-medium'>
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black/50 z-40 lg:hidden'
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className='fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-xl z-50 lg:hidden'
            >
              <div className='flex justify-between items-center p-4 border-b border-white/20'>
                <div className='flex items-center gap-2 text-2xl font-bold'>
                  <TbMoneybag className='text-indigo-200' size={32} />
                  <span className='bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent'>
                    FinanceAI
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label='Close menu'
                >
                  <X className='text-white' size={24} />
                </button>
              </div>

              <nav className='p-4 overflow-y-auto h-[calc(100%-120px)]'>
                <ul className='space-y-2'>
                  {navItems.map(item => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className='flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-white/10 hover:shadow-md'
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.IconComponent ? (
                          <item.IconComponent className='w-6 h-6 text-indigo-200' />
                        ) : (
                          <img
                            src={item.icon}
                            className='w-6 h-6 object-contain'
                            alt={item.label}
                          />
                        )}
                        <span className='font-medium'>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className='p-4 border-t border-white/10'>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className='flex items-center gap-3 w-full p-3 rounded-lg transition-all hover:bg-white/10 text-red-100 hover:text-white disabled:opacity-50'
                >
                  <LogOut className='w-5 h-5' />
                  <span className='font-medium'>
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default SiderBar
