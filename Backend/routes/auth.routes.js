import express from 'express'
import {
  checkAuthController,
  getUserController,
  signinController,
  signoutController,
  signupController
} from '../controller/auth.controller.js'

const router = express.Router()

router.post('/signup', signupController)
router.post('/signin', signinController)
router.get('/signout', signoutController)

// check user login or not
router.get('/check', checkAuthController)
router.get('/user', getUserController) // Add this line

export default router
