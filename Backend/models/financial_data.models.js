import mongoose from 'mongoose'

import User from './users.models'

const financialDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assets: {
    bankAccounts: [{ name: String, balance: Number }],
    stock: [{ name: String, balance: Number }],
    realEstate: [{ name: String, balance: Number }]
  },
  liabilities: {
    loans: [{ type: String, balance: Number }],
    creditCards: [{ type: String, balance: Number }]
  },
  income: Number,
  expenses: Number,
  creditScore: Number
})
