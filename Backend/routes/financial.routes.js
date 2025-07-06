import express from 'express'

import { createManualFinancialDataController } from '../controller/financial.controller.js'
import isAuthenticated from '../middleware/isAuthenticated.middleware.js'

const router = express.Router()

router.post(
  '/manual-create-financial-data',
  isAuthenticated,
  createManualFinancialDataController
)

export default router
