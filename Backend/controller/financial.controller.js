import FinancialData from '../models/financial_data.models.js'
import User from '../models/users.models.js'

export const createManualFinancialDataController = async (req, res) => {
  const userId = req.query.userId
  const body = req.body

  if (!userId) {
    return res.status(400).json({ error: 'Please provide a user ID' })
  }

  try {
    const existingUser = await User.findById(userId)

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    const financialData = new FinancialData({
      userId,
      assets: body.assets,
      liabilities: body.liabilities,
      income: body.income,
      expenses: body.expenses,
      creditScore: body.creditScore
    })

    await financialData.save()

    res.status(201).json({
      message: 'Financial data saved successfully',
      data: financialData
    })
  } catch (error) {
    console.error('Error saving financial data:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getFinancialDataController = async (req, res) => {
  const userId = req.user.id // ✅ use decoded token

  if (!userId) {
    return res.status(400).json({ error: 'Missing user ID' })
  }

  try {
    const financialData = await FinancialData.findOne({ userId })

    if (!financialData) {
      return res.status(404).json({ error: 'No financial data found' })
    }

    res.status(200).json({ data: financialData })
  } catch (error) {
    console.error('Error fetching financial data:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
