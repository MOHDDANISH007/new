import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

// Resolve __dirname in ES Module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import connectDB from './config/db.config.js'
import authenticationRoute from './routes/auth.routes.js'
import financialRoute from './routes/financial.routes.js'
import chatRoute from './routes/chat.routes.js'

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://riseandhackparishackathon-frontend.onrender.com'
    ],
    credentials: true
  })
)

// API Routes
app.use('/auth', authenticationRoute)
app.use('/financial', financialRoute)
app.use('/chat', chatRoute)

// 👉 Serve static frontend
app.use(express.static(path.join(__dirname, 'client/dist'))) // adjust path if needed

// 👉 Catch-all for React routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'))
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
