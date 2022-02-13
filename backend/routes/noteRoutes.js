const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const {
  getAllNotes,
  getNote,
  addNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController')

//All basic API routes
router.get('/', protect, getAllNotes)
router.get('/:id', protect, getNote)
router.post('/', protect, addNote)
router.put('/:id', protect, updateNote)
router.delete('/:id', protect, deleteNote)

module.exports = router
