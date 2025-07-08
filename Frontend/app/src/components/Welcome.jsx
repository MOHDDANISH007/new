import React from 'react'
import { motion } from 'framer-motion'

const WelcomeSection = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center"
      >
        <h1 className="text-4xl font-bold text-indigo-700 mb-4 animate-pulse">
          Welcome to FinGPT 💰
        </h1>
        <p className="text-gray-600 mb-8">
          Get smart insights into your finances using cutting-edge AI. Start by choosing an action below.
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => alert('Getting Started...')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-full shadow-md transition duration-300 transform hover:scale-105"
          >
            Refresh Before Start
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default WelcomeSection
