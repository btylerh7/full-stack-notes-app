const express = require('express')
const router = express.Router()
const {
  registerUser,
  logIn,
  deleteUser,
  logOut,
  getMe,
} = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', logIn)
router.get('/me', getMe)

module.exports = router
