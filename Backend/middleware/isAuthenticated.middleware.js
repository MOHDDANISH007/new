import jwt from 'jsonwebtoken'

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // ✅ no extra nesting
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export default isAuthenticated
