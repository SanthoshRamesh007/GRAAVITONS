const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructors: [{
    type: String
  }],
  category: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
