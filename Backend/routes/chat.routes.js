// routes/chat.routes.js
import express from 'express'
import dotenv from 'dotenv'
import User from '../models/users.models.js'
import Conversation from '../models/converstation.models.js'
import Message from '../models/message.models.js'
import { ask } from '../AI/ai.service.js' // <-- Import your Groq call here

import financialData from '../models/financial_data.models.js'
import isAuthenticated from '../middleware/isAuthenticated.middleware.js'

dotenv.config()

const router = express.Router()

router.post('/chat_with_ai', isAuthenticated, async (req, res) => {
  const { userId, conversationMessage } = req.body

  if (!userId) {
    return res.status(400).json({ error: 'Please login first' })
  }

  try {
    const userExist = await User.findById(userId)
    if (!userExist) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (!conversationMessage) {
      return res.status(400).json({ error: 'Please enter a message' })
    }

    // ✅ Fetch user's financial data
    const userFinancial = await financialData.findOne({ userId })

    // Optional: Handle if financial data is missing
    if (!userFinancial) {
      return res.status(404).json({ error: 'Financial data not found' })
    }

    // ✅ Format financial data into readable string
    // ✅ Format financial data into readable string
    const financialSummary = `
### Financial Overview ###

## Income:
- Monthly Income: ₹${userFinancial.income.monthly} (₹${
      userFinancial.income.yearly
    } yearly)
- Income Sources:
${userFinancial.income.sources
  .map(source => `  - ${source.name}: ₹${source.amount} (${source.type})`)
  .join('\n')}

## Expenses:
- Monthly Expenses: ₹${userFinancial.expenses.monthly}
- Expense Categories:
${userFinancial.expenses.categories
  .map(cat => `  - ${cat.name}: ₹${cat.amount} (${cat.type})`)
  .join('\n')}

## Assets:
### Bank Accounts:
${userFinancial.assets.bankAccounts
  .map(acc => `- ${acc.name}: ₹${acc.balance} (${acc.type})`)
  .join('\n')}

### Investments:
${userFinancial.assets.investments
  .map(
    inv =>
      `- ${inv.name}: ₹${inv.value} (Type: ${inv.type}, Return: ${inv.returnRate}%, Risk: ${inv.risk})`
  )
  .join('\n')}

### Real Estate:
${userFinancial.assets.realEstate
  .map(
    prop =>
      `- ${prop.name}: ₹${prop.balance} (Type: ${prop.type}, Location: ${prop.location}, Rental Income: ₹${prop.rentalIncome}/month)`
  )
  .join('\n')}

## Liabilities:
### Loans:
${userFinancial.liabilities.loans
  .map(
    loan =>
      `- ${loan.type} Loan: ₹${loan.balance} (Rate: ${loan.interestRate}%, EMI: ₹${loan.emi}, Tenure: ${loan.tenure} months)`
  )
  .join('\n')}

### Credit Cards:
${userFinancial.liabilities.creditCards
  .map(
    card =>
      `- ${card.issuer}: ₹${card.outstanding} (Limit: ₹${card.limit}, Interest: ${card.interestRate}%, Due Date: ${card.dueDate}th)`
  )
  .join('\n')}

## Financial Health Indicators:
- Credit Score: ${userFinancial.creditScore.value} (Last Updated: ${new Date(
      userFinancial.creditScore.lastUpdated
    ).toLocaleDateString()})
- Emergency Fund: ₹${userFinancial.emergencyFund.amount} (Covers ${
      userFinancial.emergencyFund.monthsCovered
    } months)
- Net Worth: ₹${(
      userFinancial.assets.bankAccounts.reduce(
        (sum, acc) => sum + acc.balance,
        0
      ) +
      userFinancial.assets.investments.reduce(
        (sum, inv) => sum + inv.value,
        0
      ) +
      userFinancial.assets.realEstate.reduce(
        (sum, prop) => sum + prop.balance,
        0
      ) -
      userFinancial.liabilities.loans.reduce(
        (sum, loan) => sum + loan.balance,
        0
      ) -
      userFinancial.liabilities.creditCards.reduce(
        (sum, card) => sum + card.outstanding,
        0
      )
    ).toLocaleString()}

## Financial Goals:
${userFinancial.goals
  .map(
    goal =>
      `- ${goal.name}: ₹${goal.targetAmount} by ${goal.targetYear} (Priority: ${goal.priority})`
  )
  .join('\n')}

## Risk Profile:
- Risk Tolerance: ${userFinancial.riskProfile.tolerance}
- Investment Horizon: ${userFinancial.riskProfile.investmentHorizon}
- Financial Knowledge: ${userFinancial.riskProfile.financialKnowledge}
`
    console.log('Financial Summary:', financialSummary)

    // ✅ Create conversation
    const conversation = await Conversation.create({
      userId,
      title: conversationMessage
    })

    // ✅ Save user message
    const userMsg = await Message.create({
      conversationId: conversation._id,
      userId,
      role: 'user',
      content: conversationMessage
    })

    // ✅ Ask AI (pass both prompt & financial summary)
    const aiReply = await ask(conversationMessage, financialSummary)

    // ✅ Save AI message
    const aiMsg = await Message.create({
      conversationId: conversation._id,
      role: 'ai',
      content: aiReply
    })

    res.status(200).json({
      conversation,
      messages: [userMsg, aiMsg]
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

export default router
