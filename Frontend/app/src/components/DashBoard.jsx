import React from 'react'
import { useAuth } from '../context/Auth.context'
import { useFinancial } from '../context/Financial.context'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const Dashboard = () => {
  const { user } = useAuth()
  const { financialData } = useFinancial()

  if (!user || !financialData) {
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

  const monthlyIncome = financialData.income?.monthly || 0
  const monthlyExpenses = financialData.expenses?.monthly || 0
  const netSavings = monthlyIncome - monthlyExpenses

  // Net worth over the last 6 months (simulate accumulation)
  const netWorthData = Array.from({ length: 6 }, (_, i) => {
    const month = new Date()
    month.setMonth(month.getMonth() - (5 - i))
    return {
      month: month.toLocaleString('default', { month: 'short' }),
      netWorth: netSavings * (i + 1)
    }
  })

  return (
    <div className='p-6 space-y-8'>
      {/* Welcome Banner */}
      <div className='bg-gradient-to-r from-indigo-700 to-blue-600 p-6 rounded-xl shadow-md text-white'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
          <div>
            <h1 className='text-3xl font-bold'>Welcome back, {user.name} 👋</h1>
            <p className='text-sm opacity-80'>User ID: {user._id}</p>
          </div>
          <div className='text-sm mt-2 sm:mt-0 italic opacity-90'>
            Your financial insights are ready 🚀
          </div>
        </div>
      </div>

      {/* Income/Expense Summary */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-white'>
        <div className='bg-green-600 p-4 rounded-xl shadow-md'>
          <h2 className='text-lg font-semibold'>Monthly Income</h2>
          <p className='text-2xl font-bold'>
            ₹ {monthlyIncome.toLocaleString()}
          </p>
        </div>
        <div className='bg-red-500 p-4 rounded-xl shadow-md'>
          <h2 className='text-lg font-semibold'>Monthly Expenses</h2>
          <p className='text-2xl font-bold'>
            ₹ {monthlyExpenses.toLocaleString()}
          </p>
        </div>
        <div className='bg-yellow-500 p-4 rounded-xl shadow-md'>
          <h2 className='text-lg font-semibold'>Monthly Net Savings</h2>
          <p className='text-2xl font-bold'>₹ {netSavings.toLocaleString()}</p>
        </div>
      </div>

      {/* Net Worth Trajectory Chart */}
      <div className='bg-white p-6 rounded-xl shadow-md'>
        <h3 className='text-xl font-semibold text-gray-800 mb-4'>
          📈 Net Worth Trajectory (Last 6 Months)
        </h3>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={netWorthData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis />
            <Tooltip />
            <Line
              type='monotone'
              dataKey='netWorth'
              stroke='#4f46e5'
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Dashboard
