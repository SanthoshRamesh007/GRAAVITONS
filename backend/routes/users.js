const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get current user
router.get('/current', async (req, res) => {
  try {
    // For demo purposes, return a sample user
    const user = {
      name: 'Student',
      program: 'BTECH - INFORMATION TECHNOLOGY',
      batch: 'ITR2023-C',
      semester: 'S6'
    };
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
