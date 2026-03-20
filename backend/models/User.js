const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  program: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
