const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const {
  registerUser,
  logIn,
  deleteUser,
  logOut,
  getMe,
} = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', logIn)
// router.get('/me', protect, getMe)

module.exports = router
