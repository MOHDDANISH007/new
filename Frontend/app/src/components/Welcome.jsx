import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaRobot } from 'react-icons/fa'

const WelcomeSection = ({ count, setCount }) => {
  const navi = useNavigate()

  return (
    <div className='relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-300 p-4 sm:p-6'>
      {/* Background Icon */}
      <FaRobot className='absolute text-indigo-200 text-[200px] sm:text-[300px] md:text-[400px] top-10 left-1/2 transform -translate-x-1/2 opacity-20 pointer-events-none' />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='bg-white rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-sm sm:max-w-md z-10 text-center'
      >
        <h1 className='text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-4 animate-pulse leading-tight'>
          Welcome to <span className='text-indigo-900'>FinGPT 💰</span>
        </h1>
        <p className='text-gray-600 text-sm sm:text-base mb-8 px-1'>
          Get smart insights into your finances using cutting-edge AI. Start by
          choosing an action below.
        </p>

        <div className='flex flex-col sm:flex-row justify-center gap-4'>
          <button
            onClick={() => {
              setCount(count + 1)
              navi('/document')
            }}
            className='bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full shadow-lg transition duration-300 transform hover:scale-105 w-full sm:w-auto'
          >
            🚀 Get Started
          </button>
          <button
            onClick={() => window.location.reload()}
            className='bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2.5 rounded-full shadow-md transition duration-300 transform hover:scale-105 w-full sm:w-auto'
          >
            🔄 Refresh Before Start
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default WelcomeSection
