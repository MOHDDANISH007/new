import mongoose from "mongoose";  



const financialDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  income: { 
    monthly: { type: Number, required: true },
    yearly: { type: Number },
    sources: [{
      name: String,
      amount: Number,
      type: { type: String, enum: ['salary', 'business', 'rental', 'dividends', 'other'] }
    }]
  },
  expenses: {
    monthly: { type: Number, required: true },
    categories: [{
      name: String,
      amount: Number,
      type: { type: String, enum: ['housing', 'food', 'transport', 'entertainment', 'utilities', 'debt', 'other'] }
    }]
  },
  assets: {
    bankAccounts: [{
      name: { type: String, required: true },
      balance: { type: Number, required: true },
      type: { type: String, enum: ['savings', 'current', 'fixed deposit'] }
    }],
    investments: [{
      name: String,
      type: { type: String, enum: ['FD', 'MF', 'ETF', 'Gold', 'Crypto', 'Bonds', 'PPF', 'NPS'] },
      value: Number,
      returnRate: Number,
      duration: String,
      risk: { type: String, enum: ['low', 'medium', 'high'] }
    }],
    realEstate: [{
      name: { type: String, required: true },
      balance: { type: Number, required: true },
      type: { type: String, enum: ['residential', 'commercial', 'land'] },
      location: String,
      rentalIncome: Number
    }]
  },
  liabilities: {
    loans: [{
      type: { type: String, enum: ['home', 'personal', 'auto', 'education', 'business'] },
      balance: Number,
      interestRate: Number,
      tenure: Number,
      emi: Number,
      startDate: Date
    }],
    creditCards: [{
      issuer: String,
      limit: Number,
      outstanding: Number,
      dueDate: Number,
      interestRate: Number
    }]
  },
  creditScore: { 
    value: { type: Number, required: true },
    lastUpdated: Date 
  },
  goals: [{
    name: String,
    type: { type: String, enum: ['retirement', 'house', 'education', 'marriage', 'travel', 'emergency', 'other'] },
    targetAmount: Number,
    targetYear: Number,
    priority: { type: String, enum: ['high', 'medium', 'low'] },
    notes: String
  }],
  riskProfile: {
    tolerance: { type: String, enum: ['conservative', 'moderate', 'aggressive'] },
    investmentHorizon: { type: String, enum: ['short-term (<3y)', 'medium-term (3-7y)', 'long-term (>7y)'] },
    financialKnowledge: { type: String, enum: ['beginner', 'intermediate', 'advanced'] }
  },
  tax: {
    slab: { type: String, enum: ['5%', '20%', '30%'] },
    deductions: [{
      section: String,
      amount: Number
    }],
    taxSavingInvestments: Number
  },
  emergencyFund: {
    monthsCovered: Number,
    amount: Number,
    location: String
  }
}, {
  timestamps: true
});

const FinancialData = mongoose.model('FinancialData', financialDataSchema);

export default FinancialData