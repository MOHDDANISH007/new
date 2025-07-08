import User from '../models/users.models.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  path: '/',
  maxAge: 24 * 60 * 60 * 1000
}

export async function signupController (req, res) {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' })
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: 'Password must be at least 6 characters' })
  }

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ name, email, password: hashedPassword })
    await user.save()

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1d'
    })

    res.cookie('token', token, COOKIE_OPTIONS)

    res.status(201).json({
      user: { _id: user._id, name: user.name, email: user.email },
      message: 'Account created successfully'
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const signinController = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1d'
    })

    res.cookie('token', token, COOKIE_OPTIONS)

    res.status(200).json({
      user: { _id: user._id, name: user.name, email: user.email },
      message: 'Login successful'
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const signoutController = (req, res) => {
  res.clearCookie('token', COOKIE_OPTIONS)
  res.status(200).json({ message: 'Logged out successfully' })
}

export const checkAuthController = async (req, res) => {
  const token = req.cookies.token
  if (!token) return res.json({ loggedIn: false })

  try {
    jwt.verify(token, JWT_SECRET)
    res.json({ loggedIn: true })
  } catch {
    res.json({ loggedIn: false })
  }
}

export const getUserController = async (req, res) => {
  try {
    const token = req.cookies.token
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    res.json({ user })
  } catch {
    res.status(401).json({ error: 'Unauthorized' })
  }
}
