const Note = require('../models/note')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')

////Create, read, update, and delete notes from the database////

const getAllNotes = asyncHandler(async (req, res) => {
  try {
    const allNotes = await Note.find({ user: req.user.id })
    res.status(200).json({ allNotes })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error })
  }
})

const getNote = asyncHandler(async (req, res) => {
  const note = await Note.findById({ _id: req.params.id })

  if (!note) {
    res.status(400).json({ error: 'Note not found' })
  }

  res.status(200).json(note)
})

const addNote = asyncHandler(async (req, res) => {
  const { title, note } = req.body
  const user = req.user.id

  const newNote = await Note.create({
    title: title,
    note: note,
    user: user,
  })
  res.status(201).json(newNote)
})

const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById({ _id: req.params.id })

  if (!note) {
    res.status(400).json({ error: 'Note not found' })
  }

  const user = await User.findById(req.user.id)

  if (user.id !== note.user.toString()) {
    res.status(401).json({ error: 'Not authorized' })
  }
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedNote)
})

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById({ _id: req.params.id })
  if (!note) {
    res.status(400).json({ error: 'Note not found' })
  }

  const user = await User.findById(req.user.id)

  if (user.id !== note.user.toString()) {
    res.status(401).json({ error: 'Not authorized' })
  }
  note.remove()
  res.status(200).json({ message: `Note ${req.params.id} removed` })
})

module.exports = {
  getAllNotes,
  getNote,
  addNote,
  updateNote,
  deleteNote,
}
