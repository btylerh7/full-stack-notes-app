const { text } = require("express")
const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    title: {
      type: String,
      required: [true, "A title is required."],
    },
    note: {
      type: String,
      required: [true, "Please type text in the note field."],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Note", noteSchema)
