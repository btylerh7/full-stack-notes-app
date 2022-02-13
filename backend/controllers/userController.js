const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).json({ error: 'all fields are required' })
  }
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400).json({ error: 'User already exists' })
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400).json({ error: 'user not created' })
  }
})

const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && bcrypt.compare(password, user.password)) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400).json({ error: 'Invalid credentials' })
  }
})

const deleteUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && bcrypt.compare(password, user.password)) {
    User.remove()
    res.status(200).json({ message: 'User successfully removed' })
  }
  if (!user) {
    res.status(400).json({ error: 'User not found' })
  } else {
    res.status(400).json({ error: 'Invalid credentials' })
  }
})

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400).json({ error: 'User not found' })
  }
})

const logOut = asyncHandler(async (req, res) => {})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  logIn,
  deleteUser,
}
