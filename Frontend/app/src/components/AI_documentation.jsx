import React from 'react'
import { FaRobot, FaRegChartBar } from 'react-icons/fa'
import { BsShieldLock, BsGraphUpArrow } from 'react-icons/bs'
import { MdFlashOn } from 'react-icons/md'
import { Link } from 'react-router-dom'

const AI_documentation = () => {
  return (
    <div className='p-6 sm:p-10 md:p-16 bg-gradient-to-br from-indigo-50 to-white min-h-screen'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl sm:text-5xl font-bold text-indigo-700 mb-2'>
          Let AI Speak to Your Money 💬💸
        </h1>
        <p className='text-gray-600 text-lg'>
          Supercharged by{' '}
          <span className='font-semibold text-indigo-800'>Groq</span> +{' '}
          <span className='font-semibold text-indigo-800'>LLaMA 3 (Meta)</span>{' '}
          — up to <span className='text-green-600 font-bold'>10x faster</span>{' '}
          than traditional AI models.
        </p>
      </div>

      {/* Problem & Solution */}
      <div className='grid md:grid-cols-2 gap-12 mb-16'>
        <div>
          <h2 className='text-2xl font-semibold text-indigo-700 mb-4'>
            🧩 The Problem
          </h2>
          <p className='text-gray-700'>
            Most finance apps give generic advice. But real users have unique
            situations — debts, EMIs, income fluctuations, goals — that need
            tailored insights.
          </p>
        </div>
        <div>
          <h2 className='text-2xl font-semibold text-indigo-700 mb-4'>
            🚀 Our Solution
          </h2>
          <p className='text-gray-700'>
            Our AI Assistant connects to your financial data using Fi’s MCP
            (Model Context Protocol). It offers smart, personalized answers
            like:
          </p>
          <ul className='list-disc list-inside mt-3 text-gray-600 space-y-1'>
            <li>“Can I afford a car EMI of ₹25,000?”</li>
            <li>“Is my net worth growing fast enough?”</li>
            <li>“What if I invest ₹10k/month for 3 years?”</li>
          </ul>
        </div>
      </div>

      {/* Features */}
      <div className='bg-indigo-100 rounded-xl p-8 shadow-md mb-16'>
        <h2 className='text-2xl font-semibold text-indigo-800 mb-6 text-center'>
          🌟 Features at a Glance
        </h2>
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center'>
          <div className='bg-white rounded-lg p-5 shadow-sm'>
            <FaRobot className='text-3xl text-indigo-700 mb-3 mx-auto' />
            <h3 className='font-semibold text-indigo-800'>Smart AI Chat</h3>
            <p className='text-gray-600 text-sm'>
              Talk to your finances naturally
            </p>
          </div>
          <div className='bg-white rounded-lg p-5 shadow-sm'>
            <BsGraphUpArrow className='text-3xl text-green-700 mb-3 mx-auto' />
            <h3 className='font-semibold text-green-800'>Dynamic Charts</h3>
            <p className='text-gray-600 text-sm'>
              Visualize trends & growth clearly
            </p>
          </div>
          <div className='bg-white rounded-lg p-5 shadow-sm'>
            <MdFlashOn className='text-3xl text-yellow-600 mb-3 mx-auto' />
            <h3 className='font-semibold text-yellow-700'>
              10x Faster Responses
            </h3>
            <p className='text-gray-600 text-sm'>
              Groq + LLaMA 3 infer in real-time
            </p>
          </div>
          <div className='bg-white rounded-lg p-5 shadow-sm'>
            <BsShieldLock className='text-3xl text-red-600 mb-3 mx-auto' />
            <h3 className='font-semibold text-red-700'>Secure Data</h3>
            <p className='text-gray-600 text-sm'>
              MCP auto-fetches & encrypts your data
            </p>
          </div>
        </div>
      </div>

      {/* Action Required */}
      <div className='text-center bg-white border border-indigo-200 shadow-lg rounded-xl px-6 py-10'>
        <h2 className='text-2xl font-bold text-indigo-700 mb-4'>
          📢 Action Required from You!
        </h2>
        <p className='text-gray-700 max-w-2xl mx-auto mb-4'>
          To unlock personalized AI guidance, please fill out the financial
          credentials form. But don't worry — thanks to our integration with
          Fi's <strong>MCP</strong>, most data (like your income, expenses,
          loans, and assets) is{' '}
          <span className='font-semibold text-green-600'>auto-fetched</span>.
          You won’t need to enter everything manually.
        </p>
        <p className='text-sm text-gray-600 italic'>
          Your data stays encrypted and secure. We use it only to serve you
          meaningful insights.
        </p>
        <Link to='/form'>
          <button className='mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium shadow'>
            Fill Financial Form
          </button>
        </Link>
      </div>
    </div>
  )
}

export default AI_documentation
