import mongoose from 'mongoose'

const financialDataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    assets: {
      bankAccounts: [
        {
          name: { type: String, required: true },
          balance: { type: Number, required: true }
        }
      ],
      stock: [
        {
          name: { type: String, required: true },
          balance: { type: Number, required: true }
        }
      ],
      realEstate: [
        {
          name: { type: String, required: true },
          balance: { type: Number, required: true }
        }
      ]
    },
    liabilities: {
      loans: [
        {
          type: { type: String, required: true },
          balance: { type: Number, required: true }
        }
      ],
      creditCards: [
        {
          type: { type: String, required: true },
          balance: { type: Number, required: true }
        }
      ]
    },
    income: { type: Number, required: true },
    expenses: { type: Number, required: true },
    creditScore: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)

const FinancialData = mongoose.model('FinancialData', financialDataSchema)
export default FinancialData
