import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiDollarSign,
  FiHome,
  FiCreditCard,
  FiTrendingUp,
  FiPlus,
  FiTrash2
} from 'react-icons/fi'
import { MdOutlineRealEstateAgent, MdAccountBalance } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useAuth } from '../context/Auth.context'

const FinancialDataForm = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const BASE_URL = 'https://new-backend-w5z3.onrender.com'
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
        `${BASE_URL}/financial/manual-create-financial-data?userId=${user._id}`,
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

            {/* Expenses Section */}
            <div className='mb-8 p-4 border border-gray-200 rounded-lg'>
              <h2 className='text-xl font-semibold flex items-center gap-2 mb-4 text-indigo-600'>
                <FiCreditCard /> Expense Details
              </h2>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Monthly Expenses (₹)*
                </label>
                <input
                  type='number'
                  className='w-full p-2 border border-gray-300 rounded-md'
                  value={formData.expenses.monthly}
                  onChange={e =>
                    handleChange('expenses', 'monthly', e.target.value)
                  }
                  required
                />
              </div>

              <h3 className='font-medium text-gray-800 mb-3'>
                Expense Categories*
              </h3>
              {formData.expenses.categories.map((category, index) => (
                <div key={index} className='mb-4 p-3 bg-gray-50 rounded-md'>
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Category Name*
                      </label>
                      <input
                        type='text'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={category.name}
                        onChange={e =>
                          handleChange(
                            'expenses',
                            'categories',
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
                        value={category.amount}
                        onChange={e =>
                          handleChange(
                            'expenses',
                            'categories',
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
                        value={category.type}
                        onChange={e =>
                          handleChange(
                            'expenses',
                            'categories',
                            { type: e.target.value },
                            index
                          )
                        }
                        required
                      >
                        <option value=''>Select type</option>
                        <option value='housing'>Housing</option>
                        <option value='food'>Food</option>
                        <option value='transport'>Transport</option>
                        <option value='utilities'>Utilities</option>
                        <option value='entertainment'>Entertainment</option>
                        <option value='debt'>Debt Payment</option>
                        <option value='other'>Other</option>
                      </select>
                    </div>
                  </div>
                  {formData.expenses.categories.length > 1 && (
                    <button
                      type='button'
                      className='text-red-500 text-sm flex items-center gap-1'
                      onClick={() =>
                        removeItem('expenses', 'categories', index)
                      }
                    >
                      <FiTrash2 size={14} /> Remove Category
                    </button>
                  )}
                </div>
              ))}
              <button
                type='button'
                className='text-indigo-600 text-sm flex items-center gap-1 mt-2'
                onClick={() =>
                  addItem('expenses', 'categories', {
                    name: '',
                    amount: '',
                    type: ''
                  })
                }
              >
                <FiPlus size={14} /> Add Another Expense Category
              </button>
            </div>

            {/* Assets Section */}
            <div className='mb-8 p-4 border border-gray-200 rounded-lg'>
              <h2 className='text-xl font-semibold flex items-center gap-2 mb-4 text-indigo-600'>
                <FiTrendingUp /> Assets
              </h2>

              {/* Bank Accounts */}
              <h3 className='font-medium text-gray-800 mb-3 flex items-center gap-2'>
                <MdAccountBalance /> Bank Accounts
              </h3>
              {formData.assets.bankAccounts.map((account, index) => (
                <div key={index} className='mb-4 p-3 bg-gray-50 rounded-md'>
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Account Name*
                      </label>
                      <input
                        type='text'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={account.name}
                        onChange={e =>
                          handleChange(
                            'assets',
                            'bankAccounts',
                            { name: e.target.value },
                            index
                          )
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Balance (₹)*
                      </label>
                      <input
                        type='number'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={account.balance}
                        onChange={e =>
                          handleChange(
                            'assets',
                            'bankAccounts',
                            { balance: e.target.value },
                            index
                          )
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Account Type*
                      </label>
                      <select
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={account.type}
                        onChange={e =>
                          handleChange(
                            'assets',
                            'bankAccounts',
                            { type: e.target.value },
                            index
                          )
                        }
                        required
                      >
                        <option value=''>Select type</option>
                        <option value='savings'>Savings</option>
                        <option value='current'>Current</option>
                        <option value='fixed deposit'>Fixed Deposit</option>
                        <option value='other'>Other</option>
                      </select>
                    </div>
                  </div>
                  {formData.assets.bankAccounts.length > 1 && (
                    <button
                      type='button'
                      className='text-red-500 text-sm flex items-center gap-1'
                      onClick={() =>
                        removeItem('assets', 'bankAccounts', index)
                      }
                    >
                      <FiTrash2 size={14} /> Remove Account
                    </button>
                  )}
                </div>
              ))}
              <button
                type='button'
                className='text-indigo-600 text-sm flex items-center gap-1 mt-2 mb-6'
                onClick={() =>
                  addItem('assets', 'bankAccounts', {
                    name: '',
                    balance: '',
                    type: ''
                  })
                }
              >
                <FiPlus size={14} /> Add Another Bank Account
              </button>

              {/* Investments */}
              <h3 className='font-medium text-gray-800 mb-3 flex items-center gap-2'>
                <FiTrendingUp /> Investments
              </h3>
              {formData.assets.investments.map((investment, index) => (
                <div key={index} className='mb-4 p-3 bg-gray-50 rounded-md'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Investment Name*
                      </label>
                      <input
                        type='text'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={investment.name}
                        onChange={e =>
                          handleChange(
                            'assets',
                            'investments',
                            { name: e.target.value },
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
                        value={investment.type}
                        onChange={e =>
                          handleChange(
                            'assets',
                            'investments',
                            { type: e.target.value },
                            index
                          )
                        }
                        required
                      >
                        <option value=''>Select type</option>
                        <option value='MF'>Mutual Fund</option>
                        <option value='Stocks'>Stocks</option>
                        <option value='Bonds'>Bonds</option>
                        <option value='FD'>Fixed Deposit</option>
                        <option value='PPF'>PPF</option>
                        <option value='other'>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Current Value (₹)*
                      </label>
                      <input
                        type='number'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={investment.value}
                        onChange={e =>
                          handleChange(
                            'assets',
                            'investments',
                            { value: e.target.value },
                            index
                          )
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Return Rate (%)*
                      </label>
                      <input
                        type='number'
                        step='0.1'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={investment.returnRate}
                        onChange={e =>
                          handleChange(
                            'assets',
                            'investments',
                            { returnRate: e.target.value },
                            index
                          )
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Duration
                      </label>
                      <input
                        type='text'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={investment.duration}
                        onChange={e =>
                          handleChange(
                            'assets',
                            'investments',
                            { duration: e.target.value },
                            index
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Risk Level*
                      </label>
                      <select
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={investment.risk}
                        onChange={e =>
                          handleChange(
                            'assets',
                            'investments',
                            { risk: e.target.value },
                            index
                          )
                        }
                        required
                      >
                        <option value=''>Select risk</option>
                        <option value='low'>Low</option>
                        <option value='medium'>Medium</option>
                        <option value='high'>High</option>
                      </select>
                    </div>
                  </div>
                  {formData.assets.investments.length > 1 && (
                    <button
                      type='button'
                      className='text-red-500 text-sm flex items-center gap-1'
                      onClick={() => removeItem('assets', 'investments', index)}
                    >
                      <FiTrash2 size={14} /> Remove Investment
                    </button>
                  )}
                </div>
              ))}
              <button
                type='button'
                className='text-indigo-600 text-sm flex items-center gap-1 mt-2 mb-6'
                onClick={() =>
                  addItem('assets', 'investments', {
                    name: '',
                    type: '',
                    value: '',
                    returnRate: '',
                    duration: '',
                    risk: ''
                  })
                }
              >
                <FiPlus size={14} /> Add Another Investment
              </button>

              {/* Real Estate */}
              <h3 className='font-medium text-gray-800 mb-3 flex items-center gap-2'>
                <MdOutlineRealEstateAgent /> Real Estate
              </h3>
              {formData.assets.realEstate.map((property, index) => (
                <div key={index} className='mb-4 p-3 bg-gray-50 rounded-md'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Property Name*
                      </label>
                      <input
                        type='text'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={property.name}
                        onChange={e =>
                          handleChange(
                            'assets',
                            'realEstate',
                            { name: e.target.value },
                            index
                          )
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Current Value (₹)*
                      </label>
                      <input
                        type='number'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={property.balance}
                        onChange={e =>
                          handleChange(
                            'assets',
                            'realEstate',
                            { balance: e.target.value },
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
                        value={property.type}
                        onChange={e =>
                          handleChange(
                            'assets',
                            'realEstate',
                            { type: e.target.value },
                            index
                          )
                        }
                        required
                      >
                        <option value=''>Select type</option>
                        <option value='residential'>Residential</option>
                        <option value='commercial'>Commercial</option>
                        <option value='land'>Land</option>
                        <option value='other'>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Location
                      </label>
                      <input
                        type='text'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={property.location}
                        onChange={e =>
                          handleChange(
                            'assets',
                            'realEstate',
                            { location: e.target.value },
                            index
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Rental Income (₹/month)
                      </label>
                      <input
                        type='number'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={property.rentalIncome}
                        onChange={e =>
                          handleChange(
                            'assets',
                            'realEstate',
                            { rentalIncome: e.target.value },
                            index
                          )
                        }
                      />
                    </div>
                  </div>
                  {formData.assets.realEstate.length > 1 && (
                    <button
                      type='button'
                      className='text-red-500 text-sm flex items-center gap-1'
                      onClick={() => removeItem('assets', 'realEstate', index)}
                    >
                      <FiTrash2 size={14} /> Remove Property
                    </button>
                  )}
                </div>
              ))}
              <button
                type='button'
                className='text-indigo-600 text-sm flex items-center gap-1 mt-2'
                onClick={() =>
                  addItem('assets', 'realEstate', {
                    name: '',
                    balance: '',
                    type: '',
                    location: '',
                    rentalIncome: ''
                  })
                }
              >
                <FiPlus size={14} /> Add Another Property
              </button>
            </div>

            {/* Liabilities Section */}
            <div className='mb-8 p-4 border border-gray-200 rounded-lg'>
              <h2 className='text-xl font-semibold flex items-center gap-2 mb-4 text-indigo-600'>
                <FiHome /> Liabilities
              </h2>

              {/* Loans */}
              <h3 className='font-medium text-gray-800 mb-3'>Loans</h3>
              {formData.liabilities.loans.map((loan, index) => (
                <div key={index} className='mb-4 p-3 bg-gray-50 rounded-md'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Loan Type*
                      </label>
                      <select
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={loan.type}
                        onChange={e =>
                          handleChange(
                            'liabilities',
                            'loans',
                            { type: e.target.value },
                            index
                          )
                        }
                        required
                      >
                        <option value=''>Select type</option>
                        <option value='home'>Home Loan</option>
                        <option value='auto'>Auto Loan</option>
                        <option value='personal'>Personal Loan</option>
                        <option value='education'>Education Loan</option>
                        <option value='other'>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Outstanding Balance (₹)*
                      </label>
                      <input
                        type='number'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={loan.balance}
                        onChange={e =>
                          handleChange(
                            'liabilities',
                            'loans',
                            { balance: e.target.value },
                            index
                          )
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Interest Rate (%)*
                      </label>
                      <input
                        type='number'
                        step='0.1'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={loan.interestRate}
                        onChange={e =>
                          handleChange(
                            'liabilities',
                            'loans',
                            { interestRate: e.target.value },
                            index
                          )
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Tenure (months)*
                      </label>
                      <input
                        type='number'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={loan.tenure}
                        onChange={e =>
                          handleChange(
                            'liabilities',
                            'loans',
                            { tenure: e.target.value },
                            index
                          )
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        EMI (₹)*
                      </label>
                      <input
                        type='number'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={loan.emi}
                        onChange={e =>
                          handleChange(
                            'liabilities',
                            'loans',
                            { emi: e.target.value },
                            index
                          )
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Start Date
                      </label>
                      <input
                        type='date'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={loan.startDate}
                        onChange={e =>
                          handleChange(
                            'liabilities',
                            'loans',
                            { startDate: e.target.value },
                            index
                          )
                        }
                      />
                    </div>
                  </div>
                  {formData.liabilities.loans.length > 1 && (
                    <button
                      type='button'
                      className='text-red-500 text-sm flex items-center gap-1'
                      onClick={() => removeItem('liabilities', 'loans', index)}
                    >
                      <FiTrash2 size={14} /> Remove Loan
                    </button>
                  )}
                </div>
              ))}
              <button
                type='button'
                className='text-indigo-600 text-sm flex items-center gap-1 mt-2 mb-6'
                onClick={() =>
                  addItem('liabilities', 'loans', {
                    type: '',
                    balance: '',
                    interestRate: '',
                    tenure: '',
                    emi: '',
                    startDate: ''
                  })
                }
              >
                <FiPlus size={14} /> Add Another Loan
              </button>

              {/* Credit Cards */}
              <h3 className='font-medium text-gray-800 mb-3'>Credit Cards</h3>
              {formData.liabilities.creditCards.map((card, index) => (
                <div key={index} className='mb-4 p-3 bg-gray-50 rounded-md'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Issuer*
                      </label>
                      <input
                        type='text'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={card.issuer}
                        onChange={e =>
                          handleChange(
                            'liabilities',
                            'creditCards',
                            { issuer: e.target.value },
                            index
                          )
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Credit Limit (₹)*
                      </label>
                      <input
                        type='number'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={card.limit}
                        onChange={e =>
                          handleChange(
                            'liabilities',
                            'creditCards',
                            { limit: e.target.value },
                            index
                          )
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Outstanding (₹)*
                      </label>
                      <input
                        type='number'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={card.outstanding}
                        onChange={e =>
                          handleChange(
                            'liabilities',
                            'creditCards',
                            { outstanding: e.target.value },
                            index
                          )
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Due Date (day of month)*
                      </label>
                      <input
                        type='number'
                        min='1'
                        max='31'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={card.dueDate}
                        onChange={e =>
                          handleChange(
                            'liabilities',
                            'creditCards',
                            { dueDate: e.target.value },
                            index
                          )
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Interest Rate (%)*
                      </label>
                      <input
                        type='number'
                        step='0.1'
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={card.interestRate}
                        onChange={e =>
                          handleChange(
                            'liabilities',
                            'creditCards',
                            { interestRate: e.target.value },
                            index
                          )
                        }
                        required
                      />
                    </div>
                  </div>
                  {formData.liabilities.creditCards.length > 1 && (
                    <button
                      type='button'
                      className='text-red-500 text-sm flex items-center gap-1'
                      onClick={() =>
                        removeItem('liabilities', 'creditCards', index)
                      }
                    >
                      <FiTrash2 size={14} /> Remove Card
                    </button>
                  )}
                </div>
              ))}
              <button
                type='button'
                className='text-indigo-600 text-sm flex items-center gap-1 mt-2'
                onClick={() =>
                  addItem('liabilities', 'creditCards', {
                    issuer: '',
                    limit: '',
                    outstanding: '',
                    dueDate: '',
                    interestRate: ''
                  })
                }
              >
                <FiPlus size={14} /> Add Another Credit Card
              </button>
            </div>

            {/* Credit Score Section */}
            <div className='mb-8 p-4 border border-gray-200 rounded-lg'>
              <h2 className='text-xl font-semibold flex items-center gap-2 mb-4 text-indigo-600'>
                <FiCreditCard /> Credit Score
              </h2>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Credit Score
                  </label>
                  <input
                    type='number'
                    min='300'
                    max='900'
                    className='w-full p-2 border border-gray-300 rounded-md'
                    value={formData.creditScore.value}
                    onChange={e =>
                      handleChange('creditScore', 'value', e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Last Updated
                  </label>
                  <input
                    type='date'
                    className='w-full p-2 border border-gray-300 rounded-md'
                    value={formData.creditScore.lastUpdated}
                    onChange={e =>
                      handleChange('creditScore', 'lastUpdated', e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

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
