import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Auth.context'
import axios from 'axios'
import {
  FiDollarSign,
  FiHome,
  FiCreditCard,
  FiTrendingUp,
  FiPlus,
  FiTrash2
} from 'react-icons/fi'
import { MdOutlineRealEstateAgent, MdAccountBalance } from 'react-icons/md'

const FinancialDataForm = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    income: {
      monthly: '',
      yearly: '',
      sources: [{ name: '', amount: '', type: '' }]
    },
    expenses: {
      monthly: '',
      categories: [{ name: '', amount: '', type: '' }]
    },
    assets: {
      bankAccounts: [{ name: '', balance: '', type: '' }],
      investments: [
        {
          name: '',
          type: '',
          value: '',
          returnRate: '',
          duration: '',
          risk: ''
        }
      ],
      realEstate: [
        { name: '', balance: '', type: '', location: '', rentalIncome: '' }
      ]
    },
    liabilities: {
      loans: [
        {
          type: '',
          balance: '',
          interestRate: '',
          tenure: '',
          emi: '',
          startDate: ''
        }
      ],
      creditCards: [
        {
          issuer: '',
          limit: '',
          outstanding: '',
          dueDate: '',
          interestRate: ''
        }
      ]
    },
    creditScore: {
      value: '',
      lastUpdated: ''
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (section, field, value, index = null) => {
    if (index !== null) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: prev[section][field].map((item, i) =>
            i === index ? { ...item, ...value } : item
          )
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }))
    }
  }

  const addItem = (section, field, template) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], template]
      }
    }))
  }

  const removeItem = (section, field, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter((_, i) => i !== index)
      }
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(
        `https://new-backend-w5z3.onrender.com/financial/manual-create-financial-data?userId=${user._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      console.log('Data saved successfully:', response.data)
      navigate('/groqAndLlama')
    } catch (err) {
      console.error('Error saving financial data:', err)
      setError(err.response?.data?.error || 'Failed to save financial data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8'>
      {error && (
        <div className='max-w-4xl mx-auto mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded'>
          {error}
        </div>
      )}

      <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
        <div className='p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-indigo-700 mb-2'>
            Financial Data Form
          </h1>
          <p className='text-gray-600 mb-6'>
            Please fill in your financial details to get personalized AI
            recommendations. Fields marked with{' '}
            <span className='text-red-500'>*</span> are required.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Income Section */}
            <div className='mb-8 p-4 border border-gray-200 rounded-lg'>
              <h2 className='text-xl font-semibold flex items-center gap-2 mb-4 text-indigo-600'>
                <FiDollarSign /> Income Details
              </h2>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Monthly Income (₹)*
                  </label>
                  <input
                    type='number'
                    className='w-full p-2 border border-gray-300 rounded-md'
                    value={formData.income.monthly}
                    onChange={e =>
                      handleChange('income', 'monthly', e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Yearly Income (₹)
                  </label>
                  <input
                    type='number'
                    className='w-full p-2 border border-gray-300 rounded-md'
                    value={formData.income.yearly}
                    onChange={e =>
                      handleChange('income', 'yearly', e.target.value)
                    }
                  />
                </div>
              </div>

              <h3 className='font-medium text-gray-800 mb-3'>
                Income Sources*
              </h3>
              {formData.income.sources.map((source, index) => (
                <div key={index} className='mb-4 p-3 bg-gray-50 rounded-md'>
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Source Name*
                      </label>
                      <input
                        type='text'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={source.name}
                        onChange={e =>
                          handleChange(
                            'income',
                            'sources',
                            { name: e.target.value },
                            index
                          )
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Amount (₹)*
                      </label>
                      <input
                        type='number'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={source.amount}
                        onChange={e =>
                          handleChange(
                            'income',
                            'sources',
                            { amount: e.target.value },
                            index
                          )
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Type*
                      </label>
                      <select
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={source.type}
                        onChange={e =>
                          handleChange(
                            'income',
                            'sources',
                            { type: e.target.value },
                            index
                          )
                        }
                        required
                      >
                        <option value=''>Select type</option>
                        <option value='salary'>Salary</option>
                        <option value='business'>Business</option>
                        <option value='freelance'>Freelance</option>
                        <option value='investment'>Investment</option>
                        <option value='other'>Other</option>
                      </select>
                    </div>
                  </div>
                  {formData.income.sources.length > 1 && (
                    <button
                      type='button'
                      className='text-red-500 text-sm flex items-center gap-1'
                      onClick={() => removeItem('income', 'sources', index)}
                    >
                      <FiTrash2 size={14} /> Remove Source
                    </button>
                  )}
                </div>
              ))}
              <button
                type='button'
                className='text-indigo-600 text-sm flex items-center gap-1 mt-2'
                onClick={() =>
                  addItem('income', 'sources', {
                    name: '',
                    amount: '',
                    type: ''
                  })
                }
              >
                <FiPlus size={14} /> Add Another Income Source
              </button>
            </div>

            {/* Rest of your form sections (Expenses, Assets, Liabilities, Credit Score) */}
            {/* ... Keep all your existing form sections exactly as they are ... */}

            <div className='flex justify-end gap-4 mt-8'>
              <button
                type='button'
                className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type='submit'
                className='px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center'
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Submit Financial Data'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FinancialDataForm
