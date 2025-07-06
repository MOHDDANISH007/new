import jwt from 'jsonwebtoken'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token // <-- Get token from cookie
  console.log('token : ', token)
  if (!token) {
    return res.status(401).json({ error: 'Please login first' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // ✅ Set req.user
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}

export default isAuthenticated