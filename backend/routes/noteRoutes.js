const express = require('express')
const router = express.Router()
const {
  getAllNotes,
  getNote,
  addNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController')

//All basic API routes
router.get('/', getAllNotes)
router.get('/:id', getNote)
router.post('/', addNote)
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)

module.exports = router
