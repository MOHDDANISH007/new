import express from 'express'
import {
  checkAuthController,
  getUserController,
  signinController,
  signoutController,
  signupController
} from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signup', signupController)
router.post('/signin', signinController)
router.get('/signout', signoutController)
router.get('/check', checkAuthController)
router.get('/user', getUserController)

export default router
