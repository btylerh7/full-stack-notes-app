const Note = require("../models/note")
const asyncHandler = require("express-async-handler")

////Create, read, update, and delete notes from the database////

const getAllNotes = asyncHandler(async (req, res) => {
  try {
    const allNotes = await Note.find()
    res.status(200).json({ allNotes })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error })
  }
})

const getNote = asyncHandler(async (req, res) => {})

const addNote = asyncHandler(async (req, res) => {})

const updateNote = asyncHandler(async (req, res) => {})

const deleteNote = asyncHandler(async (req, res) => {})

module.exports = {
  getAllNotes,
  getNote,
  addNote,
  updateNote,
  deleteNote,
}
