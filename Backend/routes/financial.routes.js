import express from 'express'

import {
  createManualFinancialDataController,
  getFinancialDataController
} from '../controller/financial.controller.js'
import isAuthenticated from '../middleware/isAuthenticated.middleware.js'

const router = express.Router()

router.post(
  '/manual-create-financial-data',
  isAuthenticated,
  createManualFinancialDataController
)

router.get('/get-financial-data', isAuthenticated, getFinancialDataController)

export default router
