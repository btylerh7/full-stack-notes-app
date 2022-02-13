const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')

const protect = asyncHandler(async (req, res, next) => {
  let token
  let auth = req.headers.authorization
  if (auth && auth.startsWith('Bearer')) {
    try {
      token = auth.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (erorr) {
      res.status(401).json({ error: 'not authorized' })
    }
  }
  if (!token) {
    res.status(401).json({ error: 'Not authorized. No token' })
  }
})

module.exports = protect
