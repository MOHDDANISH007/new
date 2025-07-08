import React from 'react'
import { useFinancial } from '../context/Financial.context'
import { useAuth } from '../context/Auth.context'
import {
  FiDollarSign,
  FiCreditCard,
  FiTrendingUp,
  FiHome,
  FiEdit,
  FiUser,
  FiPieChart,
  FiBriefcase,
  FiLayers
} from 'react-icons/fi'
import {
  MdOutlineRealEstateAgent,
  MdOutlineAccountBalance,
  MdAccountBalance
} from 'react-icons/md'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom' // ✅ CORRECT

const Setting = () => {
  const { financialData } = useFinancial()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = React.useState('overview')
  const navigate = useNavigate()

  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0)
  }

  const handleAddFinancialData = () => {
    navigate('/form') // <-- absolute path, not relative
  }

  const formatDate = dateString => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const calculateNetWorth = () => {
    if (!financialData) return 0

    const assets =
      (financialData.assets?.bankAccounts?.reduce(
        (sum, acc) => sum + (acc.balance || 0),
        0
      ) || 0) +
      (financialData.assets?.investments?.reduce(
        (sum, inv) => sum + (inv.value || 0),
        0
      ) || 0) +
      (financialData.assets?.realEstate?.reduce(
        (sum, prop) => sum + (prop.balance || 0),
        0
      ) || 0)

    const liabilities =
      (financialData.liabilities?.loans?.reduce(
        (sum, loan) => sum + (loan.balance || 0),
        0
      ) || 0) +
      (financialData.liabilities?.creditCards?.reduce(
        (sum, card) => sum + (card.outstanding || 0),
        0
      ) || 0)

    return assets - liabilities
  }

  const StatCard = ({
    title,
    value,
    icon: Icon,
    iconColor = 'text-indigo-500',
    bgColor = 'bg-indigo-50'
  }) => (
    <motion.div
      whileHover={{ y: -2 }}
      className={`p-4 rounded-xl shadow-sm border border-gray-200 ${bgColor}`}
    >
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-medium text-gray-600'>{title}</p>
          <p className='text-xl font-bold mt-1'>
            {typeof value === 'number' ? formatCurrency(value) : value || 'N/A'}
          </p>
        </div>
        <div
          className={`p-2 rounded-full ${iconColor.replace(
            'text',
            'bg'
          )} bg-opacity-20`}
        >
          <Icon className={`text-lg ${iconColor}`} />
        </div>
      </div>
    </motion.div>
  )

  if (!financialData) {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-gray-50'>
        <div className='text-center max-w-md p-6 bg-white rounded-xl shadow-sm'>
          <FiPieChart className='mx-auto text-4xl text-indigo-500 mb-4' />
          <h2 className='text-xl font-bold text-gray-800 mb-2'>
            No Financial Data Found
          </h2>
          <p className='text-gray-600 mb-6'>
            We couldn't find any financial data associated with your account.
            Please add your financial information to get started.
          </p>
          <button
            onClick={handleAddFinancialData}
            className='bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition'
          >
            Add Financial Data
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>
              Financial Dashboard
            </h1>
            <p className='text-gray-500 text-sm'>
              Last updated:{' '}
              {formatDate(financialData.updatedAt || financialData.createdAt)}
            </p>
          </div>
          <div className='flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-200'>
            <div className='bg-indigo-100 p-2 rounded-full'>
              <FiUser className='text-indigo-600 text-lg' />
            </div>
            <div>
              <p className='font-medium text-sm'>{user?.name || user?.email}</p>
              <p className='text-xs text-gray-500'>
                User ID: {user?._id?.slice(-6)}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className='border-b border-gray-200 mb-6'>
          <nav className='-mb-px flex space-x-4 overflow-x-auto'>
            {[
              { id: 'overview', label: 'Overview', icon: FiPieChart },
              { id: 'income', label: 'Income', icon: FiDollarSign },
              { id: 'expenses', label: 'Expenses', icon: FiCreditCard },
              { id: 'assets', label: 'Assets', icon: FiTrendingUp },
              { id: 'liabilities', label: 'Liabilities', icon: FiHome }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className='text-base' />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'
          >
            <StatCard
              title='Monthly Income'
              value={financialData.income?.monthly}
              icon={FiDollarSign}
              iconColor='text-green-500'
              bgColor='bg-green-50'
            />
            <StatCard
              title='Monthly Expenses'
              value={financialData.expenses?.monthly}
              icon={FiCreditCard}
              iconColor='text-red-500'
              bgColor='bg-red-50'
            />
            <StatCard
              title='Net Worth'
              value={calculateNetWorth()}
              icon={FiTrendingUp}
              iconColor='text-blue-500'
              bgColor='bg-blue-50'
            />
            <StatCard
              title='Credit Score'
              value={financialData.creditScore?.value}
              icon={MdOutlineAccountBalance}
              iconColor='text-purple-500'
              bgColor='bg-purple-50'
            />
          </motion.div>
        )}

        {/* Detailed Sections */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
          {/* Income Section */}
          {activeTab === 'income' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className='p-6 border-b border-gray-200 flex justify-between items-center'>
                <h2 className='text-xl font-bold flex items-center gap-2'>
                  <FiDollarSign className='text-green-500' />
                  Income Sources
                </h2>
                <button className='text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1'>
                  <FiEdit size={14} /> Edit
                </button>
              </div>
              <div className='divide-y divide-gray-200'>
                {financialData.income?.sources?.map((source, index) => (
                  <div key={index} className='p-6 hover:bg-gray-50 transition'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <h3 className='font-medium'>{source.name}</h3>
                        <p className='text-sm text-gray-500 capitalize'>
                          {source.type}
                        </p>
                      </div>
                      <p className='text-lg font-semibold'>
                        {formatCurrency(source.amount)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Expenses Section */}
          {activeTab === 'expenses' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className='p-6 border-b border-gray-200 flex justify-between items-center'>
                <h2 className='text-xl font-bold flex items-center gap-2'>
                  <FiCreditCard className='text-red-500' />
                  Expense Categories
                </h2>
                <button className='text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1'>
                  <FiEdit size={14} /> Edit
                </button>
              </div>
              <div className='divide-y divide-gray-200'>
                {financialData.expenses?.categories?.map((category, index) => (
                  <div key={index} className='p-6 hover:bg-gray-50 transition'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <h3 className='font-medium'>{category.name}</h3>
                        <p className='text-sm text-gray-500 capitalize'>
                          {category.type}
                        </p>
                      </div>
                      <p className='text-lg font-semibold'>
                        {formatCurrency(category.amount)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Assets Section */}
          {activeTab === 'assets' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className='p-6 border-b border-gray-200'>
                <h2 className='text-xl font-bold flex items-center gap-2'>
                  <FiTrendingUp className='text-blue-500' />
                  Assets
                </h2>
              </div>

              <div className='p-6 border-b border-gray-200'>
                <h3 className='font-medium flex items-center gap-2 mb-4'>
                  <MdAccountBalance className='text-blue-400' />
                  Bank Accounts
                </h3>
                <div className='space-y-4'>
                  {financialData.assets?.bankAccounts?.map((account, index) => (
                    <div key={index} className='bg-gray-50 p-4 rounded-lg'>
                      <div className='flex justify-between'>
                        <div>
                          <p className='font-medium'>{account.name}</p>
                          <p className='text-sm text-gray-500 capitalize'>
                            {account.type}
                          </p>
                        </div>
                        <p className='font-semibold'>
                          {formatCurrency(account.balance)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='p-6 border-b border-gray-200'>
                <h3 className='font-medium flex items-center gap-2 mb-4'>
                  <FiBriefcase className='text-green-400' />
                  Investments
                </h3>
                <div className='space-y-4'>
                  {financialData.assets?.investments?.map(
                    (investment, index) => (
                      <div key={index} className='bg-gray-50 p-4 rounded-lg'>
                        <div className='flex justify-between mb-2'>
                          <p className='font-medium'>{investment.name}</p>
                          <p className='font-semibold'>
                            {formatCurrency(investment.value)}
                          </p>
                        </div>
                        <div className='grid grid-cols-2 gap-2 text-sm text-gray-600'>
                          <p>Type: {investment.type}</p>
                          <p>Return: {investment.returnRate}%</p>
                          <p>Risk: {investment.risk}</p>
                          <p>Duration: {investment.duration}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className='p-6'>
                <h3 className='font-medium flex items-center gap-2 mb-4'>
                  <MdOutlineRealEstateAgent className='text-purple-400' />
                  Real Estate
                </h3>
                <div className='space-y-4'>
                  {financialData.assets?.realEstate?.map((property, index) => (
                    <div key={index} className='bg-gray-50 p-4 rounded-lg'>
                      <div className='flex justify-between mb-2'>
                        <p className='font-medium'>{property.name}</p>
                        <p className='font-semibold'>
                          {formatCurrency(property.balance)}
                        </p>
                      </div>
                      <div className='grid grid-cols-2 gap-2 text-sm text-gray-600'>
                        <p>Type: {property.type}</p>
                        <p>Location: {property.location}</p>
                        <p>
                          Rental Income: {formatCurrency(property.rentalIncome)}
                          /month
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Liabilities Section */}
          {activeTab === 'liabilities' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className='p-6 border-b border-gray-200'>
                <h2 className='text-xl font-bold flex items-center gap-2'>
                  <FiLayers className='text-red-500' />
                  Liabilities
                </h2>
              </div>

              <div className='p-6 border-b border-gray-200'>
                <h3 className='font-medium flex items-center gap-2 mb-4'>
                  <FiHome className='text-orange-400' />
                  Loans
                </h3>
                <div className='space-y-4'>
                  {financialData.liabilities?.loans?.map((loan, index) => (
                    <div key={index} className='bg-gray-50 p-4 rounded-lg'>
                      <div className='flex justify-between mb-2'>
                        <p className='font-medium'>{loan.type} Loan</p>
                        <p className='font-semibold'>
                          {formatCurrency(loan.balance)}
                        </p>
                      </div>
                      <div className='grid grid-cols-2 gap-2 text-sm text-gray-600'>
                        <p>Interest: {loan.interestRate}%</p>
                        <p>EMI: {formatCurrency(loan.emi)}</p>
                        <p>Tenure: {loan.tenure} months</p>
                        <p>Started: {formatDate(loan.startDate)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='p-6'>
                <h3 className='font-medium flex items-center gap-2 mb-4'>
                  <FiCreditCard className='text-red-400' />
                  Credit Cards
                </h3>
                <div className='space-y-4'>
                  {financialData.liabilities?.creditCards?.map(
                    (card, index) => (
                      <div key={index} className='bg-gray-50 p-4 rounded-lg'>
                        <div className='flex justify-between mb-2'>
                          <p className='font-medium'>{card.issuer}</p>
                          <p className='font-semibold'>
                            {formatCurrency(card.outstanding)}
                          </p>
                        </div>
                        <div className='grid grid-cols-2 gap-2 text-sm text-gray-600'>
                          <p>Limit: {formatCurrency(card.limit)}</p>
                          <p>Interest: {card.interestRate}%</p>
                          <p>Due Date: {card.dueDate}th</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Setting
