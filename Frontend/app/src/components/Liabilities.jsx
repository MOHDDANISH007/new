import React from 'react'
import { useFinancial } from '../context/Financial.context'
import { useAuth } from '../context/Auth.context'
import { CreditCard, Landmark, Banknote } from 'lucide-react'

const formatINR = num =>
  num?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) || '₹0'

const Liabilities = () => {
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

  const { loans = [], creditCards = [] } = financialData.liabilities || {}

  const totalLoanBalance = loans.reduce((sum, loan) => sum + loan.balance, 0)
  const totalCardOutstanding = creditCards.reduce(
    (sum, card) => sum + card.outstanding,
    0
  )

  return (
    <div className='p-6 space-y-10'>
      {/* Greeting Header */}
      <div className='text-center bg-gradient-to-r from-red-600 to-pink-600 text-white p-6 rounded-xl shadow'>
        <h1 className='text-3xl font-bold'>Hey {user?.name || 'User'} 👋</h1>
        <p className='text-sm mt-2 text-white/90'>
          Here’s a summary of your liabilities
        </p>
      </div>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        <div className='bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 border-l-4 border-red-600'>
          <Banknote className='text-red-600 w-10 h-10' />
          <div>
            <h4 className='text-gray-600 text-sm'>Total Loan Balance</h4>
            <p className='text-lg font-semibold'>
              {formatINR(totalLoanBalance)}
            </p>
          </div>
        </div>
        <div className='bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 border-l-4 border-pink-600'>
          <CreditCard className='text-pink-600 w-10 h-10' />
          <div>
            <h4 className='text-gray-600 text-sm'>Credit Card Outstanding</h4>
            <p className='text-lg font-semibold'>
              {formatINR(totalCardOutstanding)}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className='space-y-10'>
        {/* Loans */}
        <section>
          <h3 className='text-2xl font-semibold text-red-700 mb-4'>🏦 Loans</h3>
          <div className='grid md:grid-cols-2 gap-6'>
            {loans.map((loan, i) => (
              <div
                key={i}
                className='bg-white p-5 rounded-xl shadow hover:shadow-md transition'
              >
                <h4 className='text-lg font-bold text-red-800 mb-1 capitalize'>
                  {loan.type} Loan
                </h4>
                <p className='text-gray-700'>EMI: {formatINR(loan.emi)}</p>
                <p className='text-gray-700'>
                  Interest Rate: {loan.interestRate}%
                </p>
                <p className='text-gray-700'>Tenure: {loan.tenure} months</p>
                <p className='text-gray-800 font-semibold'>
                  Balance: {formatINR(loan.balance)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Credit Cards */}
        <section>
          <h3 className='text-2xl font-semibold text-pink-700 mb-4'>
            💳 Credit Cards
          </h3>
          <div className='grid md:grid-cols-2 gap-6'>
            {creditCards.map((card, i) => (
              <div
                key={i}
                className='bg-white p-5 rounded-xl shadow hover:shadow-md transition'
              >
                <h4 className='text-lg font-bold text-pink-800 mb-1'>
                  {card.issuer} Credit Card
                </h4>
                <p className='text-gray-700'>Limit: {formatINR(card.limit)}</p>
                <p className='text-gray-700'>
                  Outstanding: {formatINR(card.outstanding)}
                </p>
                <p className='text-gray-700'>Due Date: {card.dueDate}th</p>
                <p className='text-gray-700'>
                  Interest Rate: {card.interestRate}%
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Liabilities
