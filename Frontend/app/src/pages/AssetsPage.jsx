import React from 'react'
import { useFinancial } from '../context/Financial.context'
import { useAuth } from '../context/Auth.context'
import { Banknote, Home, LineChart } from 'lucide-react'

const formatINR = num =>
  num?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) || '₹0'

const Assets = () => {
  const { financialData } = useFinancial()
  const { user } = useAuth()

  if (!financialData) {
    return (
      <div className='text-center text-lg mt-10 text-gray-500'>
        <h1 className='text-2xl font-bold'>
          No Financial Data Available for {user?.name}
        </h1>
        <h3>
          Please fill out the form. For now, we are still working on integrating
          the MCP server.
        </h3>
      </div>
    )
  }

  const {
    bankAccounts = [],
    investments = [],
    realEstate = []
  } = financialData.assets || {}

  const totalBankBalance = bankAccounts.reduce(
    (sum, acc) => sum + acc.balance,
    0
  )
  const totalInvestment = investments.reduce((sum, inv) => sum + inv.value, 0)
  const totalRealEstate = realEstate.reduce((sum, r) => sum + r.balance, 0)

  return (
    <div className='p-6 space-y-10'>
      {/* Greeting Header */}
      <div className='text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow'>
        <h1 className='text-3xl font-bold'>
          Welcome back, {user?.name || 'User'} 👋
        </h1>
        <p className='text-sm mt-2 text-white/90'>
          Your Assets Summary is Ready Below
        </p>
      </div>

      {/* Overview Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
        <div className='bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 border-l-4 border-blue-600'>
          <Banknote className='text-blue-600 w-10 h-10' />
          <div>
            <h4 className='text-gray-600 text-sm'>Bank Balance</h4>
            <p className='text-lg font-semibold'>
              {formatINR(totalBankBalance)}
            </p>
          </div>
        </div>

        <div className='bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 border-l-4 border-green-600'>
          <LineChart className='text-green-600 w-10 h-10' />
          <div>
            <h4 className='text-gray-600 text-sm'>Investments</h4>
            <p className='text-lg font-semibold'>
              {formatINR(totalInvestment)}
            </p>
          </div>
        </div>

        <div className='bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 border-l-4 border-yellow-600'>
          <Home className='text-yellow-600 w-10 h-10' />
          <div>
            <h4 className='text-gray-600 text-sm'>Real Estate</h4>
            <p className='text-lg font-semibold'>
              {formatINR(totalRealEstate)}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className='space-y-10'>
        {/* Bank Accounts */}
        <section>
          <h3 className='text-2xl font-semibold text-blue-700 mb-4'>
            🏦 Bank Accounts
          </h3>
          <div className='grid md:grid-cols-2 gap-6'>
            {bankAccounts.map((acc, i) => (
              <div
                key={i}
                className='bg-white p-5 rounded-xl shadow hover:shadow-md transition'
              >
                <h4 className='text-lg font-bold text-blue-800 mb-1'>
                  {acc.name}
                </h4>
                <p className='text-gray-700'>Type: {acc.type}</p>
                <p className='text-gray-800 font-semibold'>
                  Balance: {formatINR(acc.balance)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Investments */}
        <section>
          <h3 className='text-2xl font-semibold text-green-700 mb-4'>
            📈 Investments
          </h3>
          <div className='grid md:grid-cols-2 gap-6'>
            {investments.map((inv, i) => (
              <div
                key={i}
                className='bg-white p-5 rounded-xl shadow hover:shadow-md transition'
              >
                <h4 className='text-lg font-bold text-green-800 mb-1'>
                  {inv.name}
                </h4>
                <p className='text-gray-700'>Type: {inv.type}</p>
                <p className='text-gray-700'>Return Rate: {inv.returnRate}%</p>
                <p className='text-gray-700'>Risk: {inv.risk}</p>
                <p className='text-gray-800 font-semibold'>
                  Value: {formatINR(inv.value)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Real Estate */}
        <section>
          <h3 className='text-2xl font-semibold text-yellow-700 mb-4'>
            🏠 Real Estate
          </h3>
          <div className='grid md:grid-cols-2 gap-6'>
            {realEstate.map((estate, i) => (
              <div
                key={i}
                className='bg-white p-5 rounded-xl shadow hover:shadow-md transition'
              >
                <h4 className='text-lg font-bold text-yellow-800 mb-1'>
                  {estate.name}
                </h4>
                <p className='text-gray-700'>Location: {estate.location}</p>
                <p className='text-gray-700'>Type: {estate.type}</p>
                <p className='text-gray-700'>
                  Rental Income: {formatINR(estate.rentalIncome)}
                </p>
                <p className='text-gray-800 font-semibold'>
                  Value: {formatINR(estate.balance)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Assets
