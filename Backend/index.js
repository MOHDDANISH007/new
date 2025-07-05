import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import connectDB from './config/db.config.js'
import authenticationRoute from './routes/auth.routes.js'

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use('/auth', authenticationRoute)

// Corrected the order of parameters: req comes before res
app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
