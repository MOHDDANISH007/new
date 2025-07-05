import express from 'express'

import {createManualFinancialDataController} from '../controller/financial.controller.js'

const router = express.Router()

router.post('/manual-create-financial-data', createManualFinancialDataController)

export default router
