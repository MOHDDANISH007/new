import React from 'react'
import { useFinancial } from '../context/Financial.context'
import { useAuth } from '../context/Auth.context'
import { Banknote, CalendarClock } from 'lucide-react'

const formatINR = amount =>
  amount?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) ||
  '₹0'

const Loan = () => {
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

  const { loans = [] } = financialData.liabilities || {}

  const totalLoanBalance = loans.reduce((sum, loan) => sum + loan.balance, 0)

  return (
    <div className='p-6 space-y-10'>
      {/* Greeting */}
      <div className='bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6 rounded-xl shadow text-center'>
        <h1 className='text-3xl font-bold'>Hello {user?.name || 'User'} 👋</h1>
        <p className='text-white/90 mt-1'>
          Here's a breakdown of your loan responsibilities
        </p>
      </div>

      {/* Summary Card */}
      <div className='bg-white shadow-md rounded-xl p-6 flex items-center gap-4 border-l-4 border-indigo-600'>
        <Banknote className='w-10 h-10 text-indigo-600' />
        <div>
          <h4 className='text-gray-500'>Total Loan Balance</h4>
          <p className='text-xl font-semibold text-gray-800'>
            {formatINR(totalLoanBalance)}
          </p>
        </div>
      </div>

      {/* Detailed Loan Cards */}
      <div className='grid md:grid-cols-2 gap-6'>
        {loans.map((loan, idx) => (
          <div
            key={idx}
            className='bg-white rounded-xl shadow p-6 hover:shadow-lg transition'
          >
            <h2 className='text-xl font-bold text-indigo-700 capitalize mb-1'>
              {loan.type} Loan
            </h2>
            <p className='text-gray-700 mb-1'>
              Balance: {formatINR(loan.balance)}
            </p>
            <p className='text-gray-700 mb-1'>EMI: {formatINR(loan.emi)}</p>
            <p className='text-gray-700 mb-1'>
              Interest Rate: {loan.interestRate}%
            </p>
            <p className='text-gray-700 mb-1'>Tenure: {loan.tenure} months</p>
            <p className='text-gray-700 flex items-center gap-2'>
              <CalendarClock className='w-4 h-4 text-indigo-500' />
              Start Date: {new Date(loan.startDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loan
