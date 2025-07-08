import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import connectDB from './config/db.config.js'
import authenticationRoute from './routes/auth.routes.js'
import financialRoute from './routes/financial.routes.js'
import chatRoute from './routes/chat.routes.js'

dotenv.config()
connectDB()

const app = express()

app.use(
  cors({
    origin: ['https://localhost:5173', 'https://new-frontend-ax82.onrender.com'],
    credentials: true
  })
)

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use('/auth', authenticationRoute)
app.use('/financial', financialRoute)
app.use('/chat', chatRoute)

// Corrected the order of parameters: req comes before res
app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
