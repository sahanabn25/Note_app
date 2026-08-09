const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  content: String,
  bgColor: {
    type: String,
    default: '#f3c641'
  }
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
