const mongoose = require('mongoose')

const { Schema } = mongoose

const notesSchema = new Schema({
  title: {
    type: String,
    trim: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  isPinned: {
    type: Boolean,
    required: false,
    default: false
  },
  user: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Note', notesSchema)